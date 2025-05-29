// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import axios from "axios";

// const Orders = () => {
//   // const { products, currency } = useContext(ShopContext); до ↓ было так
//   const { backendUrl, token, currency } = useContext(ShopContext); // благодаря backendURL и token получаем ордера пользователя

//   const [orderData, setorderData] = useState([]);

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return null;
//       }

//       const response = await axios.post(
//         backendUrl + "/api/order/userorders",
//         {},
//         { headers: { token } }
//       );
//       // console.log(response.data);
//       //показываем ордера .зера
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             (item["status"] = order.status),
//               (item["payment"] = order.payment),
//               (item["paymentMethod"] = order.paymentMethod),
//               (item["date"] = order.date),
//               allOrdersItem.push(item);
//           });
//         });
//         // console.log(allOrdersItem);
//         setorderData(allOrdersItem.reverse()); //вывод ордеров юзера
//       }
//     } catch (error) {}
//   };

//   // проверка на обноление страницы
//   useEffect(() => {
//     loadOrderData();
//   }, [token]);
//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <Title text1={"МОИ"} text2={"ЗАКАЗЫ"} />
//       </div>

//       <div>
//         {orderData.map((item, index) => (
//           <div
//             key={index}
//             className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div className="flex items-start gap-6 text-sm">
//               <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
//               <div>
//                 <p className="sm:text-base font-medium">{item.name}</p>
//                 <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
//                   <p>
//                     {currency}
//                     {item.price}
//                   </p>
//                   <p>Количество: {item.quantity}</p>
//                   <p>Размер: {item.size}</p>
//                 </div>
//                 <p className="mt-1">
//                   {/* Изменил под RU-RU */}
//                   Дата:{" "}
//                   <span className="text-gray-400">
//                     {new Date(item.date).toLocaleDateString("ru-RU", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </p>
//                 <p className="mt-1">
//                   Оплата:{" "}
//                   <span className="text-gray-400">{item.paymentMethod}</span>
//                 </p>
//               </div>
//             </div>
//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                 <p className="text-sm md:text-base">{item.status}</p>
//               </div>
//               <button
//                 onClick={loadOrderData}
//                 className="border px-4 py-2 text-sm font-medium rounded-sm"
//               >
//                 Отследить Заказ
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // для раскрытия заказа

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        // Сохраняем массив заказов как есть (не разбиваем по товарам)
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"МОИ"} text2={"ЗАКАЗЫ"} />
      </div>

      <div>
        {orders.length === 0 && <p>Заказы не найдены.</p>}

        {orders.map((order) => (
          <div key={order._id} className="border-t py-4">
            {/* Заголовок заказа — основная инфа */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(order._id)}
            >
              <div>
                <p className="font-semibold">
                  Заказ #{order._id.slice(-6)} {/* Можно форматировать */}
                </p>
                <p className="text-sm text-gray-600">
                  Дата:{" "}
                  {new Date(order.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600">Статус: {order.status}</p>
              </div>
              <div>
                <button className="border px-4 py-2 rounded-sm text-sm">
                  {expandedOrderId === order._id ? "Свернуть" : "Открыть"}
                </button>
              </div>
            </div>

            {/* Детали заказа — товары */}
            {expandedOrderId === order._id && (
              <div className="mt-4 space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-6 text-gray-700 items-center"
                  >
                    <img
                      className="w-16 sm:w-20"
                      src={item.image[0]}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-base">
                        <p>
                          {currency}
                          {item.price}
                        </p>
                        <p>Количество: {item.quantity}</p>
                        <p>Размер: {item.size}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Оплата: {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
