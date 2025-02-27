import {  mongoose} from "mongoose";
import fs from 'fs';

const ProductSchema = new mongoose.Schema({
    name:{type:String,require:true},
    category: {
        type: String,
        // required: true
      },
      description: {
        type: String,
        // required: true
      },
      price: {
        type: Number,
        // required: true
      },
      weight: {
        type: Array,
        // required: true
      },
      availability: {
        type: String,
        // enum: ['In Stock', 'Out of Stock'], 
        // required: true
      },
      image: {
        type: Array, 
        // required: true
      },
      bestseller: {
        type: Boolean,
        // required: true
      },
      season: {
        type: String,
        // required: true
      },
      packaging: {
        type: String,
        // required: true
      },
      sizeCategory: {
        type: String,
        // required: true
      },
      date:{type:Number}
})
const ProductModel=mongoose.model("product",ProductSchema);


// let insertData=async()=>{
//   const data=JSON.parse(fs.readFileSync('product123.json','UTF8'));
//   const result=await ProductModel.insertMany(data);
//   console.log(result);
// }
// insertData();
export default ProductModel