import express from 'express';
import {  registerUser} from '../controller/Usercontroll.js';
import { userlogin} from '../controller/Usercontroll.js';
import { adminLogin} from '../controller/Usercontroll.js';
// import { forgotPassword } from '../controller/forgetpassword.js'; 

const useRouter=express.Router();
useRouter.post('/register',registerUser);
useRouter.post('/Login',userlogin);
useRouter.post('/Admin',adminLogin);
// useRouter.post('/forget',forgotPassword);

 



export default useRouter
