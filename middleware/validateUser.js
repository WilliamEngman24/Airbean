import db from "../data/db.js";


//both GET and PUT users/:id uses this
export function validateUserCheck(req, res, next) {
    const id = req.params.id;

    const user = db.prepare('SELECT id, username, email, user_date FROM users WHERE id = ?').get(id);

    if (!user) {
        return res.status(404).json({ error: 'Kunde inte hämta denna användare' });
    }

    req.user = user; // pass the user data to endpoint to avoid querying the database again

    next();
}


export function validateUserCreate(req, res, next) {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Kunde inte skapa användare. Alla fält måste fyllas i.' });
    }

    next();
}

export function validateUserUpdate(req, res, next) {

    const { username, email } = req.body;

    if (!username && !email) {
        return res.status(400).json({ error: 'Kunde inte uppdatera användare. Något fält måste fyllas i.' });
    }

    next();
}