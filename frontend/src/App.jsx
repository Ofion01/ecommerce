import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Verify from "./pages/Verify";
import Vacancies from "./pages/Vacancies";
import VacancyDetails from "./components/VacancyDetails";
import PrivacyPolicy from "./pages/PrivacyPolicies";
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer /> {/*выдача ошибок*/}
      <Navbar />
      <SearchBar />
      {/*Navbar будет иметь доступ ко всем страницам, т.к тег указан перед рутом */}
      {/*Создал пути для файлов jsx*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/vacancies/:vacancyId" element={<VacancyDetails />} />
        <Route path="/privacypolicies" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
