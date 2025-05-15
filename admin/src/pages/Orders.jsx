import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      //call api
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      // console.log(response.data); вывод в консоли имеющихся ордеров в бд
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHadler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // вывод ордеров на странице ордеров
  return (
    <div>
      <h3>Страинца Заказов</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 pt-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            {" "}
            {/* Подключениеи бэку */}
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              {/* Display UserName */}
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                {/* Display address */}
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            {/* Display order details: order, quantity, method, payment method, payment status and date */}
            <div>
              <p className="text-sm sm:text-[15px]">
                Товары : {order.items.length}
              </p>
              <p className="mt-3">Метод : {order.paymentMethod}</p>
              <p>Оплата : {order.payment ? "Done" : "Penging"}</p>
              <p>Дата : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            {/* Order status */}
            <select
              onChange={(event) => statusHadler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              {/* Изначально на английском было */}
              <option value="Заказ размещен">Заказ размещен</option>
              <option value="Упаковывается">Упаковывается</option>
              <option value="Отправлен">Отправлен</option>
              <option value="Готово к доставке">Готово к доставке</option>
              <option value="Доставлено">Доставлено</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
