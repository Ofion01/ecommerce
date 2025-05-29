import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const handleVacanciesClick = () => {
    navigate("/vacancies");
  };

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"СВЯЗАТЬСЯ"} text2={"С НАМИ"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Наш Магазин</p>
          <p className="text-gray-500">
            ул. Лесная, д. 24, кв. 58 <br /> г. Екатеринбург, Свердловская
            область, 620041, Россия
          </p>
          <p className="text-gray-500">
            Tel: (123) 456-7890 <br /> Email: delovoy@mail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Карьера в Delovoy
          </p>
          <p className="text-gray-500">
            Узнайте больше о наших командах и вакансиях.
          </p>
          <button
            onClick={handleVacanciesClick}
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Посмотреть вакансии
          </button>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Contact;
