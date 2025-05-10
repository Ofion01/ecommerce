// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";

// global variables
const currency = "inr"; //поменять на доллар/рубль (сейчас указана индийская валюта) СЕЙЧАС CURRENCY БЕРЕТСЯ ИЗ АПКИ АДМИНКИ, В СЛУЧАЕ
// ЕСЛИ НУЖНО ОСТАВИТЬ inr раскаментить это и закоменить иморт currency из App.jsx
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //метод оплаты через Stripe

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
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers; //инициализация оплаты(содержит frontend url)

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false, // только в случае COD работает(согласно логике)
      date: Date.now(),
    };

    // Create new order model
    const newOrder = new orderModel(orderData);
    //сохраняем ордер в базу данных
    await newOrder.save();

    // execute stripe method
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // стоимость доставки
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      // получаем url успеха или url отмены -> если платеж произошёл успешно, то мы будем перенапралвены на страницу success, иначе на отмену.
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, //origin - frontend url(пример в obsidian)
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    // в случае успеха, отправляем на страницу оплаты

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    //если success true (оплата совершилась) - payment method = true, for this orderID
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      //если оплата не свершилась удаляем ордер
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// // Placing orders using Razorpay Method Отмена, в силу невозможности подключения
const placeOrderRazorpay = async (req, res) => {};

// Вывод всех оредров в админе
// All Orders data for admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

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
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    // сохраняем данные в дб
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
