import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';


dotenv.config();
const app = express();

//importing Routes
import userRoutes from './routes/userRoutes.js';

//using routes
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
    connectDb();
})