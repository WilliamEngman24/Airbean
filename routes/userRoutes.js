import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";

//new test for dev branch

const router = Router ();

router.get('/', (_req, res) => {
    try {
        const users = db.prepare('SELECT id, username, email, user_date FROM users').all();

        if (!users || users.length === 0) {
            throw new Error();
        }

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Kunde inte hämta alla användare' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
    
        const user = db.prepare('SELECT id, username, email, user_date FROM users WHERE id = ?').get(id);

        if (!user) {
            throw new Error();
        }

        res.status(201).json(user);

    } catch (error) {
        res.status(404).json({ error: 'Kunde inte hämta denna användare' });
    }
});

router.post('/', (req, res) => {

    try {
        //can use req.body to access the data sent in the request body because of the express.json() middleware
        const { username, email } = req.body; //destructuring

        console.log('Received data:', { username, email }); //log the received data for debugging

        if (!username || !email) {
            throw new Error();
        }

        const user_date = new Date().toISOString();

        const id = uuidv4(); //generate unique id for the new user using uuid library

        const stmt = db.prepare(`
            INSERT INTO users (id, username, email, user_date)
            VALUES (?, ?, ?, ?)
            `)

        stmt.run(id, username, email, user_date);

        const newUser = db
        .prepare('SELECT id, username, email, user_date FROM users WHERE id = ?')
        .get(id); 

        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ error: 'Kunde inte skapa användare. Alla fält måste fyllas i.' });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;

    const { username, email } = req.body; //destructuring

    const user = db.prepare('SELECT id, username, email, user_date FROM users WHERE id = ?').get(id);

    if (!user) {
        return res.status(404).json({ error: 'Användare hittades inte' });
    } 

    if (!username || !email) {
        return res.status(400).json({ error: 'Namn och e-post är obligatoriska' });
    }

    const stmt = db.prepare(`
        UPDATE users
        SET username = ?, email = ?
        WHERE id = ?
    `);

    stmt.run(username, email, id);

    const updateUser = db.prepare('SELECT id, username, email, user_date FROM users WHERE id = ?').get(id);
    res.json(updateUser);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const stmt = db.prepare('DELETE FROM users WHERE id = ?');

    const result = stmt.run(id);
    
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Användare hittades inte' });
    }
    
    res.json(204).send();
});

export default router;