import userModel from "../models/UserModel.js"





const addtocard = async (req, res) => {
  try {
    const { userId, itemId, qty } = req.body;
    const userData = await userModel.findById(userId);
    let cartdata =await userData.cartdata;

   
    if (cartdata[itemId]) {
      if(cartdata[itemId][qty]){
        cartdata[itemId][qty]+=1

      }
      else{
        cartdata[itemId][qty]=1;
      }
    }
    else{
      cartdata[itemId]={};
      cartdata[itemId][qty]=1;
    }

    await userModel.findByIdAndUpdate(userId, { cartdata });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Quantity in Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, qty ,total} = req.body;
    const userData = await userModel.findById(userId);
    let cartdata =  await userData.cartdata;

      cartdata[itemId][qty] = total
      await userModel.findByIdAndUpdate(userId, { cartdata });
      res.json({ success: true, message: "Cart updated" });
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Cart Data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId)
    let  cartdata =  await userData.cartdata;
    res.json({ success: true, cartdata });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addtocard, updateCart,  getUserCart };
