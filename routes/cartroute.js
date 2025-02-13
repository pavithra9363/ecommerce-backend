import express from 'express'
// import { addToCart, updateCart, removeItemFromCart, getUserCart } from "../";
import authUser from '../middleware/Auth.js';
import { addtocard,updateCart,  getUserCart } from '../controller/cardcontroll.js';


const  cartRouter=express.Router();

cartRouter.post("/add",authUser, addtocard); 

cartRouter.post("/update",authUser, updateCart);  
cartRouter.post("/get",authUser, getUserCart); 

export default cartRouter