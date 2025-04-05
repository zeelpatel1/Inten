const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/document');
const http = require('http'); // <-- Needed for creating the HTTP server
const { Server } = require('socket.io');

const app = express();
connectDb();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Create HTTP server and bind Express
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // <-- Make sure this matches your frontend port (Vite = 5173)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('joinDocument', (documentId) => {
    socket.join(documentId);
    console.log(`User joined document ${documentId}`);
  });

  socket.on('documentUpdate', ({ documentId, title, content }) => {
    socket.to(documentId).emit('receiveUpdate', { title, content });
  });

  socket.on('sendMessage', ({ documentId, message }) => {
    socket.to(documentId).emit('receiveMessage', message);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
