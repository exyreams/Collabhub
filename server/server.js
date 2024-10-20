const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const sessions = new Map();

io.on('connection', (socket) => {
    console.log('New connection established');

    socket.on('joinSession', ({ sessionId, username, password }) => {
        if (!sessions.has(sessionId)) {
            sessions.set(sessionId, {
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

        if (session.password !== password) {
            socket.emit('sessionJoinError', 'Incorrect password');
            return;
        }

        session.users.add(username);
        socket.join(sessionId);
        socket.username = username;
        socket.sessionId = sessionId;

        console.log(`${username} connected`);

        socket.emit('sessionJoined', { sessionId, initialData: session });
        io.to(sessionId).emit('userJoined', username);
    });

    socket.on('leaveSession', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.users.delete(socket.username);
            socket.leave(socket.sessionId);
            io.to(socket.sessionId).emit('userLeft', socket.username);

            if (session.users.size === 0) {
                sessions.delete(socket.sessionId);
            }

            console.log(`${socket.username} disconnected`);

            delete socket.username;
            delete socket.sessionId;
        }
    });

    socket.on('drawLine', (line) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.drawings.push(line);
            socket.to(socket.sessionId).emit('drawLine', line);
        }
    });

    socket.on('drawShape', (shape) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.shapes.push(shape);
            socket.to(socket.sessionId).emit('drawShape', shape);
        }
    });

    socket.on('undoAction', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            socket.to(socket.sessionId).emit('undoAction');
        }
    });

    socket.on('redoAction', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            socket.to(socket.sessionId).emit('redoAction');
        }
    });

    socket.on('resetCanvas', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.drawings = [];
            session.shapes = [];
            socket.to(socket.sessionId).emit('resetCanvas');
        }
    });

    socket.on('updateCode', (newCode) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.code = newCode;
            socket.to(socket.sessionId).emit('updateCode', newCode);
        }
    });

    socket.on('updateText', (newText) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.text = newText;
            socket.to(socket.sessionId).emit('updateText', newText);
        }
    });

    socket.on('sendMessage', (message) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            const chatMessage = { username: socket.username, message };
            session.chat.push(chatMessage);
            io.to(socket.sessionId).emit('newMessage', chatMessage);
        }
    });

    socket.on('userTyping', ({ isTyping }) => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            socket.to(socket.sessionId).emit('userTyping', { username: socket.username, isTyping });
        }
    });

    socket.on('disconnect', () => {
        if (socket.sessionId && sessions.has(socket.sessionId)) {
            const session = sessions.get(socket.sessionId);
            session.users.delete(socket.username);
            io.to(socket.sessionId).emit('userLeft', socket.username);

            if (session.users.size === 0) {
                sessions.delete(socket.sessionId);
            }

            console.log(`${socket.username || 'A user'} disconnected`);
        }
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));