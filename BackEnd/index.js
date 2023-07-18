import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import morgan from 'morgan';
import { config } from 'dotenv';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js'


const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('tiny')) // log requests
app.use(cors({
    origin: '*'
}))

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'e-shop'
})
.then(() => {
    console.log('Database connection is ready');
})
.catch((err) => {
    console.log(err);
}
);

app.listen(4000, () => {
    // console.log(api);
    console.log('Server started on port 4000!');
    }
);

