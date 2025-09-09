import express from 'express';
import pool from './Database/db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    return next();
});

app.get('/pattern_lib', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pattern_library');
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.get('/shutdown', (_req, res) => {
    res.send('Shutting down server...');
    server.close(() => {
        console.log('Server closed manually.');
        process.exit(0);
    });
});