import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";

//new test for dev branch

const router = Router ();

router.get('/', (_req, res) => {
    const users = db.prepare('SELECT id, username, email, user_date FROM users').all();
    res.json(users);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    const user = db.prepare('SELECT id, username, email, user_date FROM users WHERE id = ?').get(id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

router.post('/', (req, res) => {

    //can use req.body to access the data sent in the request body because of the express.json() middleware
    const { username, email } = req.body; //destructuring

    console.log('Received data:', { username, email }); //log the received data for debugging

    if (!username || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
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
});

router.put('/:id', (req, res) => {
    const id = req.params.id;

    const { username, email } = req.body; //destructuring

    //example of avoid using destructuring
    if (!username || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const stmt = db.prepare(`
        UPDATE users
        SET username = ?, email = ?
        WHERE id = ?
    `);

    const result = stmt.run(username, email, id);

    //how many rows were updated, if 0 then the user with the given id was not found
    if (result.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    const updateUser = db.prepare('SELECT id, username, email, user_date FROM users WHERE id = ?').get(id);
    res.json(updateUser);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const stmt = db.prepare('DELETE FROM users WHERE id = ?');

    const result = stmt.run(id);
    
    if (result.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(204).send();
});

export default router;