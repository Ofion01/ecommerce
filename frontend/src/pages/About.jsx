import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"О"} text2={"НАС"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Delovoy родился из стремления к элегантности и идеи переосмыслить,
            как современный человек выражает себя через деловой стиль. Наш путь
            начался с простой мысли: создать платформу, где каждый сможет легко
            находить, изучать и приобретать актуальные образы для работы и жизни
            — не выходя из дома или офиса.
          </p>
          <p>
            С момента своего основания, Delovoy стремится предложить своим
            клиентам исключительное качество и удобство. Мы внимательно отбираем
            широкий ассортимент продукции, который отвечает потребностям
            современного человека. Будь то передовые технологии, стильная мода
            или надежные товары для дома — у нас есть всё, что нужно. Мы делаем
            акцент на качестве, инновациях и удовлетворенности наших клиентов,
            чтобы Delovoy стал вашим надежным партнером для всех покупок.
          </p>
          <b className="text-gray-800">Наша Цель</b>
          <p>
            Наша миссия в Delovoy — дать нашим клиентам возможность выбирать,
            наслаждаться удобством и уверенность в каждой покупке. Мы стремимся
            предложить безупречный процесс покупок, который превосходит ожидания
            на всех этапах — от выбора и оформления заказа до доставки и
            дальнейшего обслуживания.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"ПОЧЕМУ"} text2={"ВЫБИРАЮТ НАС"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Гарантия Качества:</b>
          <p className="text-gray-600">
            Мы тщательно отбираем и проверяем каждый продукт, чтобы убедиться,
            что он соответствует нашим строгим стандартам качества.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Удобство:</b>
          <p className="text-gray-600">
            Благодаря нашему удобному интерфейсу и простому процессу заказа
            совершать покупки стало проще, чем когда-либо.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Исключительное обслуживание клиентов:</b>
          <p className="text-gray-600">
            Наша команда преданных своему делу профессионалов готова помочь вам,
            гарантируя, что ваше удовлетворение является нашим главным
            приоритетом.
          </p>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  );
};

export default About;
