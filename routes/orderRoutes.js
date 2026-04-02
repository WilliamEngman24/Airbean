import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";
import validateOrder from "../middleware/validateOrder.js";
import { calculateDiscount } from "../services/discountLogic.js";

const router = Router();

router.get("/", (_req, res) => {
    const orders = db.prepare("SELECT * FROM orders").all();
    res.json(orders);
});

router.get("/status/:id", (req, res) => {
    const id = req.params.id;

    const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);

    if (!order) {
        return res.status(404).json({ error: "Order inte hittad" });
    }

    const orderTime = new Date(order.order_date);
    const now = new Date();

    const minutesPassed = Math.floor((now - orderTime) / 60000);
    const minutesLeft = Math.max(order.ETA - minutesPassed, 0);

    console.log("now", now);
    console.log("orderTime", orderTime);
    console.log("difference date:", (now - orderTime));

    console.log("ETA: ", order.ETA);
    console.log("Minutes passed: ", minutesPassed);


    res.json({
        order_id: order.id,
        ETA: order.ETA,
        minutes_left: minutesLeft
    });
});

router.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;

    const orders = db
        .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC")
        .all(userId);

    res.json(orders);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);

    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    }

    const items = db.prepare(`
        SELECT 
            order_items.id,
            order_items.order_id,
            order_items.product_id,
            order_items.quantity
        FROM order_items
        WHERE order_items.order_id = ?
    `).all(id);

    res.json({ order, items });
});

router.post("/", validateOrder, (req, res) => {
    const { user_id, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Items saknas" });
    }

    const cart = [];

    for (const item of items) {
        const product = db
            .prepare("SELECT * FROM menu WHERE id = ?")
            .get(item.product_id);

        cart.push({
            name: product.title,
            price: product.price,
            quantity: item.quantity
        });
    }

    const {totalPreDiscount, totalPostDiscount, discountAmount, discountTypes }
        = calculateDiscount(cart);

    const totalPrice = totalPostDiscount;

    const orderId = uuidv4();
    const eta = 15 + items.length * 2;
    const orderDate = new Date().toISOString();

    const insertOrder = db.prepare(`
        INSERT INTO orders (id, user_id, total_price, eta, order_date)
        VALUES (?, ?, ?, ?, ?)
    `);

    const insertOrderItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES (?, ?, ?)
    `);

    const createOrder = db.transaction(() => {
        insertOrder.run(orderId, user_id || null, totalPrice, eta, orderDate);

        for (const item of items) {
            insertOrderItem.run(orderId, item.product_id, item.quantity);
        }
    });

    try {
        createOrder();

        res.status(201).json({
            message: "Order skapad",
            order_id: orderId,
            total_price: totalPrice,
            total_before_discount: totalPreDiscount,
            discount_amount: discountAmount,
            discount_types: discountTypes,
            eta,
            all_items: cart
        });
    } catch (error) {
        res.status(500).json({ error: "Kunde inte skapa order" });
    }
});

export default router;