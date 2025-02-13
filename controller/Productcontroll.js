import {v2 as cloudinary} from 'cloudinary';
import ProductModel from '../models/productModel.js';

const addProduct=async(req,res)=>{
   
    try{
       const{name, category,description,price, weight,availability,sizeCategory,packaging,bestseller,season}=req.body
       const image1 = req.files.image1 ? req.files.image1[0] : null;
       const image2 = req.files.image2 ? req.files.image2[0] : null;
       const image3 = req.files.image3 ? req.files.image3[0] : null;
       const image4 = req.files.image4 ? req.files.image4[0] : null;
 


   const images=[image1,image2,image3,image4].filter((item)=>item!==undefined);


   let imageUrl=await Promise.all(
    images.map(async (item) => {
        if (item && item.path) { 
            let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url; 
        }}
   ))
   const productdata=new ProductModel({
    name,
    description,
    category,
    price,
    bestseller:bestseller==="true"?true:false,
    weight,
    availability,
    sizeCategory,
    season,
    packaging,
    image: imageUrl,
    date:Date.now()

   

   })

   await productdata.save()

   
 
   

    //    console.log(name, category,description,price, weight,availability,sizeCategory,packaging,bestseller,season);
       console.log(productdata);
       
    res.json({message:"product added successfully"});
    }
    catch(error){
   res.status(500).json({ message: 'Error adding product', error: error.message });
       console.log(error)

    }
   
}

const listProduct=async(req,res)=>{
    try{
        const products=await ProductModel.find({});
        res.json({success:true,products})

    }
    catch(error){

        res.json({success:false,message:error.message})

    }

}


const singleProduct=async(req,res)=>{
    try{
         const{productId}=req.body;

         const product= await ProductModel.findById(productId)
         if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product });
    }
    catch(error){
        res.json({ sucess:false, message:error.message})

    }

}

const removeProduct=async(req,res)=>{
    try{
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({message:"deteted successfully"})
    }
    catch(error){
    res.json({ sucess:false, message:error.message})
    console.log(error)

    }

}
export{addProduct,listProduct,singleProduct,removeProduct};

