import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";

// Placing orders using COD(cash on delivery) Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false, // только в случае COD работает(согласно логике)
      date: Date.now(),
    };

    // Create new order model
    const newOrder = new orderModel(orderData);
    //сохраняем ордер в базу данных
    await newOrder.save();

    //очищаем cartdata
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// Вывод всех оредров в админе
// All Orders data for admin Panel
const allOrders = async (req, res) => {};

// User Order Data for Frontend(my order apge)
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    // вывод ордеров по id юзера(хранится в бд e-commerce.orders)
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status
// All Orders data for admin Panel
// Меняем статус в схеме orderModel.js
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
