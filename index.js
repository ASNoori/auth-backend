import express from 'express';
import connectDb from './db.js';
import SigninRouter from './routes/Signin.js';
import cors from 'cors';
import LoginRouter from './routes/Login.js';
import HomeRouter from './routes/Home.js';
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors({origin:'*'}));
connectDb();
app.use('/signin',SigninRouter);
app.use('/login',LoginRouter);
app.use('/home',HomeRouter);
app.get('/',(req,res)=>{
    res.send('Hello')
});
app.listen(port,()=>{
    console.log(`listening to port ${port}` )
})
