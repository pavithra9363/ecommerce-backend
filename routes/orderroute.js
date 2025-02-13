import express from 'express'
import { placeOrder,placeOrderStrip,placeOrderRazor,allOrder,updatestatus,userorder } from '../controller/orderControll.js'
import { adminLogin } from '../controller/Usercontroll.js'
import authUser from '../middleware/Auth.js';
const orderRouter=express.Router()


//admin
orderRouter.post('/list',adminLogin,allOrder);
orderRouter.post('/status',adminLogin,updatestatus);


//paymentfeaturs
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStrip);
orderRouter.post('/razor',authUser,placeOrderRazor);

//user features
orderRouter.post('/userorder',authUser,userorder);



export default orderRouter