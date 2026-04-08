import db from "../data/db.js";

export default function validateOrder(req, res, next) {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Items måste finnas" });
    }

    const validatedItems = [];

    for (const item of items) {
        if (!item.product_id) {
            return res.status(400).json({ error: "product_id måste finnas" });
        }

        if (!item.quantity || item.quantity < 1) {
            return res.status(400).json({ error: "Quantity måste vara minst 1" });
        }

        const product = db
            .prepare("SELECT * FROM menu WHERE id = ?")
            .get(item.product_id);

        if (!product) {
            return res.status(400).json({ error: "Produkten finns inte" });
        }

        if (item.price !== undefined && item.price !== product.price) {
            return res.status(400).json({ error: "Price mismatch" });
        }

        validatedItems.push({
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price,
            title: product.title
        });
    }

    req.validatedItems = validatedItems;
    next();
}