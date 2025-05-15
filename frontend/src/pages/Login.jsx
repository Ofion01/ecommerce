import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  //login or signup
  const [currentState, setCurrentState] = useState("Login"); // дефолт надпись на странице
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //убираем перезагрузку странцу после успешного входа
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      //call api
      if (currentState === "Sign Up") {
        // call Sign Up api
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        // console.log(response.data); в консоли будет отображен токен, который должен уйти в бд(зашиврованный пароль)
        if (response.data.success) {
          //сохраняем токен
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // call Login api
        //передаем только мыло с паролем, т.к они используются для входа
        const responce = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        // console.log(responce.data);
        if (responce.data.success) {
          setToken(responce.data.token);
          localStorage.setItem("token", responce.data.token);
        } else {
          toast.error(responce.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //после логина возвращаемся на стартовую страницу
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]); //если токен доступен, то функция исполняется

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? ( //если Login, name не выводим
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)} //сохраняем пользователя
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Ваше Имя"
          required
        ></input>
      )}
      <input
        onChange={(e) => setEmail(e.target.value)} //сохраняем пользователя
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      ></input>
      <input
        onChange={(e) => setPassword(e.target.value)} //сохраняем пользователя
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Пароль"
        required
      ></input>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Забыли пароль?</p>
        {/* Переход между входом/регистрацией */}
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Создать аккаунт
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Авторизоваться
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign up"}
      </button>
    </form>
  );
};

export default Login;
