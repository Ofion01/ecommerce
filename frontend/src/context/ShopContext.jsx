import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets"; //использовали до подключения к бэку
import { toast } from "react-toastify"; //для объявление об ошибке
import { useNavigate } from "react-router-dom";
import axios from "axios"; // для подключения к бэку

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₽";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]); //для продуктов с бэка
  const [token, setToken] = useState(""); // для проверки логина юзера
  const navigate = useNavigate(); //добавили для открытия меню совершения покупок

  //Данные для вакансий
  const [vacancies, setVacancies] = useState([]);
  const [vacanciesLoading, setVacanciesLoading] = useState(true);
  const [vacanciesError, setVacanciesError] = useState(null);

  //общий  массив с покупками/исползуется в Product.jsx
  const addToCart = async (itemId, size) => {
    //проверка - выбран ли размер?
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    // проверка: если мы зашли в DB мы также обновляем cart
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // посмотреть, какие товары в массиве покупок
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  //метод для удаления/редактирования товара в корзине
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    //обновляем количество товара в дб, при обновлении кол-ва на странице покупок

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  //получаем данные о продуктах с бэка
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data); вывод в консоль всех доступных продуктов на бэке
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // при обновлении страницы подгружаем товары в корзину из бд юзера
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // добавил для вакансий
  const fetchVacancies = async () => {
    setVacanciesLoading(true);
    setVacanciesError(null);
    try {
      const res = await axios.get(backendUrl + "/api/vacancies/public"); //изменил только на не аврувнытые вакансии
      setVacancies(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Ошибка загрузки вакансий:", error);
      setVacanciesError("Не удалось загрузить вакансии. Попробуйте позже.");
      toast.error("Ошибка загрузки вакансий");
    } finally {
      setVacanciesLoading(false);
    }
  };

  //добавил функцию отправки заявки для вакансии в бд
  const sendApplication = async (applicationData) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/applications/add",
        applicationData
      );
      if (res.data.success) {
        toast.success("Заявка отправлена!");
        return { success: true };
      } else {
        toast.error(res.data.message || "Ошибка при отправке");
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error);
      toast.error("Ошибка при отправке заявки");
      return { success: false, message: "Ошибка при отправке" };
    }
  };

  //вызываем функцию getProducts data
  useEffect(() => {
    getProductsData();
    fetchVacancies();
  }, []);

  //
  useEffect(() => {
    //если токен не доступен, но он есть в localstorage, берем его из localstorage
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  // при созданиии нового объекта, мы сможем в нем получить доступ к значениям, которые находся в константе value
  const value = {
    sendApplication, //заявка в вакансию
    vacancies, // новая страниц вакансий
    vacanciesLoading, // новая страниц вакансий
    vacanciesError, // новая страниц вакансий
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
