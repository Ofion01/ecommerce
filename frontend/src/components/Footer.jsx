import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Деловой — это онлайн-магазин современной деловой одежды и
            аксессуаров. Мы собрали более 2 тысяч брендов, предлагающих стильные
            и удобные решения для офиса, деловых встреч и повседневной работы.
            Костюмы, рубашки, обувь, сумки, галстуки и многое другое — всё, что
            нужно для уверенного и профессионального образа. Удобная доставка,
            возможность примерки, бонусная программа и регулярные акции — мы
            делаем ваш шопинг практичным, быстрым и выгодным.
          </p>
        </div>

        <div>
          <p className="text-x1 font-medium mb-5">КОМПАНИЯ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="/">Главная</a>{" "}
              {/* может стоит изменить реализацию тегов через реакт, как в navbar через navlink */}
            </li>
            <li>
              <a href="/about">О нас</a>{" "}
              {/* может стоит изменить реализацию тегов через реакт, как в navbar через navlink */}
            </li>
            <li>
              <a href="/vacancies">Вакансии</a>
            </li>{" "}
            {/* изменить/добавить фунционал */}
            <li>
              <a href="/privacypolicies">Политика конфиденциальности</a>
            </li>{" "}
            {/* изменить/добавить фунционал */}
          </ul>
        </div>

        <div>
          <p className="text-x1 font-medium mb-5">КОНТАКТЫ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+7-987-654-3210</li>
            <li>delovoy@mail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ delovoy.com - Все права защищены.
        </p>
      </div>
    </div>
  );
};

export default Footer;
