import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import analysisRoutes from './routes/analysisRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', analysisRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running with ES6 modules...');
});

const PORT = process.env.PORT || 3000;

if (!process.env.LAMBDA_TASK_ROOT) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

export default app;