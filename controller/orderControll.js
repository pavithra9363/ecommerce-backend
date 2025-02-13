//placing orders using cod method
import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
const placeOrder=async(req,res)=>{
 try {
    const {userId,items,amount,address}=req.body;


    const orderdata={
        userId,
        items,
        amount,
        address,
        PaymentMethod:"cod",
        payment:false,
        date:Date.now()

    }

   const neworder= new orderModel(orderdata);
   await neworder.save()

   await userModel.findByIdAndUpdate(userId,{cartdata:{}})

   res.json({success:true,message:"order placed"});

 } catch (error) {
    console.log(error)
    res.json({success:false ,message:error.message});
    
    
 }


}
//placing orders using strip method


const placeOrderStrip=async(req,res)=>{
    

}
//placing orders using razor method


const placeOrderRazor=async(req,res)=>{
    

}

//placing orders using admin  method

const allOrder=async(req,res)=>{
    

}


const userorder=async(req,res)=>{
    try {
        const{userId}=req.body

       const  orders=await orderModel.find({userId})
       res.json({success:true , orders});
    } catch (error) {
        console.log({success:false ,message:error.message})
    }
    

}


//update orders status admin  panel

const updatestatus=async(req,res)=>{
    

}
export{ placeOrder,placeOrderStrip,placeOrderRazor,allOrder,updatestatus,userorder}
