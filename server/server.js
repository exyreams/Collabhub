const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Define allowed origin
        methods: ["GET", "POST"] // Allow only GET and POST methods
    }
});

const sessions = new Map(); // Store session data (password, users, drawings, etc.)

io.on('connection', (socket) => {
    console.log('New connection established');

    // Join a session
    socket.on('joinSession', ({ sessionId, username, password }) => {
        if (!sessions.has(sessionId)) {
            sessions.set(sessionId, { // Create a new session if it doesn't exist
                password,
                users: new Set(),
                drawings: [],
                shapes: [],
                code: '',
                text: '',
                chat: [],
            });
        }

        const session = sessions.get(sessionId);

        if (session.password !== password) { // Validate session password
            socket.emit('sessionJoinError', 'Incorrect password');
            return;
        }

        session.users.add(username); // Add user to session
        socket.join(sessionId); // Join the specific session room
        socket.username = username;
        socket.sessionId = sessionId;

        console.log(`${username} connected`);

        socket.emit('sessionJoined', { sessionId, initialData: session }); // Send session data to the user
        io.to(sessionId).emit('userJoined', username); // Notify all users that a new user joined
    });

    // Leave a session
    socket.on('leaveSession', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.users.delete(socket.username); // Remove user from session
            socket.leave(socket.sessionId); // Leave the session room
            io.to(socket.sessionId).emit('userLeft', socket.username); // Notify others the user left

            if (session.users.size === 0) { // Delete session if no users remain
                sessions.delete(socket.sessionId);
            }

            console.log(`${socket.username} disconnected`);

            delete socket.username;
            delete socket.sessionId;
        }
    });

    // Handle drawing a line
    socket.on('drawLine', (line) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.drawings.push(line); // Add the line to the session drawings
            socket.to(socket.sessionId).emit('drawLine', line); // Broadcast the line to others
        }
    });

    // Handle drawing a shape
    socket.on('drawShape', (shape) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.shapes.push(shape); // Add the shape to the session shapes
            socket.to(socket.sessionId).emit('drawShape', shape); // Broadcast the shape to others
        }
    });

    // Handle undo action
    socket.on('undoAction', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            socket.to(socket.sessionId).emit('undoAction'); // Broadcast undo to others
        }
    });

    // Handle redo action
    socket.on('redoAction', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            socket.to(socket.sessionId).emit('redoAction'); // Broadcast redo to others
        }
    });

    // Handle resetting the canvas
    socket.on('resetCanvas', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.drawings = []; // Clear drawings
            session.shapes = []; // Clear shapes
            socket.to(socket.sessionId).emit('resetCanvas'); // Notify others to reset canvas
        }
    });

    // Update code in the session
    socket.on('updateCode', (newCode) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.code = newCode; // Update session code
            socket.to(socket.sessionId).emit('updateCode', newCode); // Broadcast code update to others
        }
    });

    // Update text in the session
    socket.on('updateText', (newText) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.text = newText; // Update session text
            socket.to(socket.sessionId).emit('updateText', newText); // Broadcast text update to others
        }
    });

    // Handle sending a message
    socket.on('sendMessage', (message) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            const chatMessage = { username: socket.username, message }; // Create chat message
            session.chat.push(chatMessage); // Add message to session chat
            io.to(socket.sessionId).emit('newMessage', chatMessage); // Broadcast message to others
        }
    });

    // Handle user typing notification
    socket.on('userTyping', ({ isTyping }) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            socket.to(socket.sessionId).emit('userTyping', { username: socket.username, isTyping }); // Notify others of typing status
        }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.users.delete(socket.username); // Remove user from session
            io.to(socket.sessionId).emit('userLeft', socket.username); // Notify others the user left

            if (session.users.size === 0) { // Delete session if no users remain
                sessions.delete(socket.sessionId);
            }

            console.log(`${socket.username || 'A user'} disconnected`);
        }
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`)); // Start server on specified port
