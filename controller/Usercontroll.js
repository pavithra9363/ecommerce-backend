import userModel from "../models/UserModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY);
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" }); // Changed status code to 400
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    // Check password strength (at least 8 characters)
    if (password.length < 8) { 
      return res.status(400).json({ message: "Please enter a strong password (at least 8 characters)" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

  
    const token = createToken(newUser._id);

    res.status(201).json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// Route for user login
const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" }); // Changed status code to 400
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" }); // Changed status code to 400
    }

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

//admin login   
const adminLogin=async(req,res)=>{
  try{
  const {email,password}=req.body
   
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRETKEY);
      return res.json({ success: true, token });

     
    }
    else {
        // If password is incorrect
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
   

   }
   catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}
 

export { registerUser ,userlogin,adminLogin};
