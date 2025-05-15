//add cart, update cart, get user cart
// import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    // const { size, itemId } = req.body;
    // const { token } = req.headers;
    // const { id } = jwt.decode(token);
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    // console.log(userData);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      //если есть предмет + его размер
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      //если нет предмета
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // await userModel.findByIdAndUpdate(id, { cartData });
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Добавлено в Корзину" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update user cart
const updateCart = async (req, res) => {
  try {
    //при вызове Api мы получим itemId,size,quantity. userId мы получим из middleware auth.js ещё до вызова
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    //сохраняем carData в DB
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Корзина Обновлена " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
