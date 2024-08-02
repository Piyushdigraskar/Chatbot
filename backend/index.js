import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';


dotenv.config();
const app = express();

//using middleware
app.use(express.json())
//importing Routes
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

//using routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
    connectDb();
})