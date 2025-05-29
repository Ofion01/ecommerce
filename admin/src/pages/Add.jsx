import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Jackets");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  //чтобы не было перезагрузки
  const onSubmitHadler = async (e) => {
    e.preventDefault();

    try {
      //Добавляем Formdata, когда произошёл вызов API
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); //тк sizes хранит всебе массив

      //чтобы можно было добавить разное кол-во изображений
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      //отправляем на backend через api

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } } //для того, чтобы backend имел токен авторизации админа
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        //обнуляем данные
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHadler}
        className="flex flex-col w-full items-start gap-3"
      >
        <div>
          <p className="mb-2">Загрузить Изображения</p>

          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              />{" "}
              {/*если фото загружено, то оно отоброзиться */}
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Название Товара</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Введите здесь"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Описание</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Напиши описание тут"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Категория Товара</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Men">Мужчинам</option>
              <option value="Women">Женщинам</option>
              {/* <option value="Kids">Дети</option> */}
            </select>
          </div>

          <div>
            <p className="mb-2">Подкатегория</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              {/* <option value="Topwear">Верхняя одежда</option>
              <option value="Bottomwear">Нижняя одежда</option>
              <option value="Winterwear">Зимняя одежда</option>
              <option value="Suits">Костюмы</option> */}
              <option value="Jackets">Пиджаки и жакеты</option>
              <option value="Shirts">Рубашки и блузки</option>
              <option value="Trousers">Брюки и юбки</option>
              <option value="Dresses">Платья</option>
              <option value="Outerwear">Пальто и плащи</option>
              <option value="Accessories">Аксессуары</option>
              <option value="Shoes">Обувь</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Цена Товара</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="Number"
              placeholder="1000"
            />
          </div>
        </div>

        <div className="mb-2">
          <p>Размеры Товара</p>
          <div className="flex gap-3">
            <div
              //для закраски выбранного размера
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("One Size")
                    ? prev.filter((item) => item !== "One Size")
                    : [...prev, "One Size"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("One Size") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                One Size
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          {/* если выбран bestseller, мы делаем переменную bestseller -> checked */}
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Добавить в бестселлер
          </label>
        </div>

        <button type="sumbit" className="w-28 py-3 mt-4 bg-black text-white">
          ДОБАВИТЬ
        </button>
      </form>
    </div>
  );
};

export default Add;
