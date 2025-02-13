import express from 'express';
import { addProduct,listProduct,singleProduct ,removeProduct} from '../controller/Productcontroll.js';
import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';
const ProductRouter=express.Router();


ProductRouter.post(
    '/add',
    upload.fields([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
      { name: 'image4', maxCount: 1 }
    ]),
    addProduct // Controller function
  );
  
ProductRouter.get('/list',listProduct);
ProductRouter.delete('/remove',removeProduct);
ProductRouter.post('/single',singleProduct);

export default ProductRouter;