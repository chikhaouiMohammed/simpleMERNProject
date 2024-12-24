import express from 'express';
import cors from 'cors'; // Import cors
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import bookRouter from './routes/booksRouter.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Apply CORS middleware
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Book Router
app.use('/books', bookRouter);

// Root route
app.get('/', (req, res) => {
    res.status(200).send("Welcome to MERN Stack Tutorial");
});

// Connecting to MongoDB
mongoose.connect(mongodbURL)
    .then(() => {
        console.log("App connected to the database");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
