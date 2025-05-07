import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

  // получаем url параметр ордера
  // пример: http://localhost:5173/verify?success=true&orderId=681a9bdbfb143335e907bce5
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // функция запускается сразу, через useEffect
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart"); // возвращает в корзину, когда выходим из меню оплаты stripe(click "back")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment(); //при запуске страницы запускаем метод verifyPeymont
  }, [token]);

  return <div></div>;
};

export default Verify;
