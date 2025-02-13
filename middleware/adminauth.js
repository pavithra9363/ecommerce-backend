import jwt from "jsonwebtoken"
const adminauth=async(req,res,next)=>{
    try{
     const {token}=req.headers
     if(!token){
        return res.json({success:false , message:"not authorized login again"});
     }
     const token_decode=jwt.verify(token,process.env.JWT_SECRETKEY);
     if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false , message:"not authorized login again"});
     }
    next()
    }
    catch(error){
        res.json({success:false , error});
        console.log("message",error);

       
    }
}
export default adminauth;