require("dotenv").config({ path: "./config.env" });
const express = require('express');
const http = require('http');
const path =require("path");
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Integrate Socket.IO with the HTTP server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB Connection Success 👍');
}).catch((err) => {
    console.error('MongoDB Connection Failed 💥', err.message);
});

// Socket.IO connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Example: Sending data to the client
    socket.emit('welcome', 'Welcome! You are now connected.');
    
    // Example: Receiving data from the client
    socket.on('clientEvent', (data) => {
        console.log('Data received from client:', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// API Routes
app.use('/api', apiRoutes); // Assuming your API routes are defined in routes/api.js

// Start the server
PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
