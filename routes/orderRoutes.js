import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";
import validateOrder from "../middleware/validateOrder.js";
import validateID from "../middleware/validateID.js";
import { calculateDiscount } from "../services/discountLogic.js";

const router = Router();

router.get("/", (_req, res) => {
    const orders = db.prepare("SELECT * FROM orders").all();

    if (orders.length === 0) {
        return res.status(500).json({ error: "Kunde inte hämta alla beställningar" });
    }

    res.json(orders);
});

router.get("/status/:id", validateID("id"),(req, res) => {
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

router.get("/user/:userId", validateID("userId"), (req, res) => {
    const userId = req.params.userId;

    const orders = db
        .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC")
        .all(userId);

    if (orders.length === 0) {
        return res.status(404).json({ error: "Inga beställningar hittade för denna användare" });
    }

    res.json(orders);
});

router.get("/:id", validateID("id"), (req, res) => {
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

    const discountItems = db.prepare(`
        SELECT 
            id,
            order_id,
            discount_id
        FROM discount_items
        WHERE discount_items.order_id = ?
    `).all(id);

    res.json({ order, items, discountItems });
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
        INSERT INTO order_items (id, order_id, product_id, quantity)
        VALUES (?, ?, ?, ?)
    `);

    const insertDiscountItem = db.prepare(`
        INSERT INTO discount_items (id, order_id, discount_id)
        VALUES (?, ?, ?)
    `);

    const createOrder = db.transaction(() => {
        insertOrder.run(orderId, user_id || null, totalPrice, eta, orderDate);

        for (const item of items) {
            insertOrderItem.run(uuidv4(), orderId, item.product_id, item.quantity);
        }

        for (const discount of discountTypes) {
            insertDiscountItem.run(uuidv4(), orderId, discount.id);
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
            eta,
            discount_types: discountTypes,
            all_items: cart
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(400).json({ error: "Kunde inte skapa order" });
    }
});

export default router;