import express  from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./confic/mongodb.js";
import connectcloudinary from "./confic/cloudinary.js";
import useRouter from "./routes/UserRoute.js";
import ProductRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

//app confic 
const app=express();
const PORT=process.env.PORT||8000

//MIDDLEWARE
app.use(express.json());
const corsOptions = {
     origin: "https://ecommerce-frontend-one-pink.vercel.app/", // Your frontend URL
     methods: "GET,POST,PUT,DELETE", // Allowed methods
     credentials: true, // Allow cookies if needed
   };
   
 app.use(cors(corsOptions));
 
connectDB();
connectcloudinary();

//api end points
app.use('/api/user',useRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);



app.get('/',(req,res)=>{
     res.send("api working correct")
});

app.listen(PORT,()=>console.log("server run"+PORT));