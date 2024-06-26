const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();  
const app = express();
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');


app.use(cors({
    origin: 'http://localhost:3000' 
  }));



const users = {
    'admin': { password: 'admin', role: 'ADMIN' },
    'user': { password: 'user', role: 'VISITOR' }
};

const permissions = {
    ADMIN: ["READ", "WRITE"],
    VISITOR: ["READ"]
};

app.use(cors());
// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.sendStatus(401);  
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);  
        }
        req.user = user;  
        next(); 
    });
}

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate a token based on user role
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The role of the user (ADMIN or VISITOR)
 *     responses:
 *       200:
 *         description: Successfully generated token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT for authenticated access
 *       400:
 *         description: Invalid role provided
 *       403:
 *         description: Unauthorized access attempt
 */

app.post('/token', (req, res) => {
    console.log("Headers:", req.headers); 
    console.log("Received body:", req.body); 

    const { role } = req.body;
    const permissions = {
        ADMIN: ["READ", "WRITE"],
        VISITOR: ["READ"]
    };

    if (!permissions[role]) {
        console.log("Role received: ", role);
        console.log("Available permissions: ", permissions);
        return res.status(400).json({ error: "Invalid role" });
    }

    const token = jwt.sign(
        { role, permissions: permissions[role] },
        process.env.JWT_SECRET,
        { expiresIn: '1m' }
    );

    res.json({ token });
});

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Access protected data
 *     tags: [Data Access]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Protected data content
 *       403:
 *         description: Forbidden, credentials are not valid for this resource
 */

app.get('/data', authenticateToken, (req, res) => {
    if (!req.user || !req.user.permissions || !req.user.permissions.includes("READ")) {
        return res.sendStatus(403);  // Forbidden: User does not have READ permission
    }
    res.json({ data: "This is protected data accessible based on permissions." });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       401:
 *         description: Unauthorized
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && user.password === password) {
        const token = jwt.sign(
            {
                username, 
                role: user.role,
                permissions: permissions[user.role]
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  
        );
        return res.json({ token, username, role: user.role });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});


/**
 * @swagger
 * /user-data:
 *   get:
 *     summary: Get user data based on the provided token
 *     tags: [User Info]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Access Forbidden
 */

app.get('/user-data', authenticateToken, (req, res) => {
    if (!req.user) {
        return res.status(403).json({ error: "Access Forbidden" });
    } else {
        res.json({ username: req.user.username, role: req.user.role, permissions: req.user.permissions });
    }
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




