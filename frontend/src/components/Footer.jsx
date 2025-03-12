import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industy. Lorem Ipsum has been the industy's standard dummy text ever
            since the 1500s, when an unknows printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-x1 font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="/">Home</a>{" "}
              {/* может стоит изменить реализацию тегов через реакт, как в navbar через navlink */}
            </li>
            <li>
              <a href="/about">About us</a>{" "}
              {/* может стоит изменить реализацию тегов через реакт, как в navbar через navlink */}
            </li>
            <li>Delivery</li> {/* изменить/добавить фунционал */}
            <li>Privacy policy</li> {/* изменить/добавить фунционал */}
          </ul>
        </div>

        <div>
          <p className="text-x1 font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@email.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
