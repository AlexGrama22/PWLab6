const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Ensure the .env file is loaded to use environment variables

const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer

    if (!token) {
        return res.sendStatus(401);  // No token provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);  // Token verification failed
        }
        req.user = user;  // Set the user info for downstream use
        next();  // Continue to the next middleware or route handler
    });
}

// Route to generate token
app.post('/token', (req, res) => {
    console.log("Headers:", req.headers); // Log headers to check content-type
    console.log("Received body:", req.body); // This will show what is received in the request body

    const { role } = req.body;
    const permissions = {
        ADMIN: ["READ", "WRITE"],
        VISITOR: ["READ"]
    };

    if (!permissions[role]) {
        console.log("Role received: ", role); // This will show what role is received
        console.log("Available permissions: ", permissions); // This shows available roles and permissions
        return res.status(400).json({ error: "Invalid role" });
    }

    const token = jwt.sign(
        { role, permissions: permissions[role] },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
    );

    res.json({ token });
});

// Protected route
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
