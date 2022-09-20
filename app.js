import {} from 'dotenv/config';
import express from 'express';
import path from 'path';
import { connectDB } from './db/connection.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { tasks } from './routes/tasks.js';

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(path.resolve('./public')));
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch(error) {
        console.log(error);
    }
};

start();