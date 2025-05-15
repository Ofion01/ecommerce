import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Постая политика возврата</p>
        <p className="text-gray-400">
          Мы предлагаем политику беспроблемного обмена
        </p>
      </div>

      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Политика возврата в течение 14 дней</p>
        <p className="text-gray-400">
          Мы предоставляем 14 дней бесплатного возврата
        </p>
      </div>

      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Лучшая поддержка клиентов</p>
        <p className="text-gray-400">мы обеспечиваем 24/7 поддержку клиентов</p>
      </div>
    </div>
  );
};

export default OurPolicy;
