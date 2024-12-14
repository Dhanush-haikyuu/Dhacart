const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const order=require('./routes/order');
const product = require('./routes/product');
const connectiondatabase=require('./config/connectDatabase')
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname,'config','config.env')});

app.use(express.json());
app.use(cors());

app.use('/api/v1/orders',order);
app.use('/api/v1/products',product);

connectiondatabase();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}  it will be in the ${process.env.NODE_ENV}`);
})