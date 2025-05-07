import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import List from "./pages/List.jsx";

export const backendUrl = import.meta.env.VITE_BAKCEND_URL;
export const currency = "$"; //замена на Pубль
const App = () => {
  //сначала проверяем localstorage на доступность, если нет доступа, возвращаяем ""
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  ); // если что-то ввести в "" то отверстает
  //если токен доступен, то покажем страницу, нет - не покажем

  //чтобы мы не разлогинивались после перезагрузки страницы
  //когда токен обновляется, выполняется код useEffect? сохряняя его
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} /> {/* Logout */}
          <hr className="border-t-0" />{" "}
          {/* возможно стоит будет убрать стиль, без него черная лиения */}
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
