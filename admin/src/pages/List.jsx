import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      //получаем список через API, и добавляем все продукты в переменную List(через setList)
      const responce = await axios.get(backendUrl + "/api/product/list"); //в гайде не .post, а .get
      if (responce.data.success) {
        setList(responce.data.products);
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //функция удаления продукта из бд
  const removeProduct = async (id) => {
    try {
      const responce = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (responce.data.success) {
        toast.success(responce.data.message);
        //показываем новый список, после удаления продукта
        await fetchList();
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //запускаем функцию fetchList, когда происходит запуск страницы.
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap">
        {/* ------- List Table Title ------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border-gray-100 py-1 px-2  text-sm">
          {" "}
          {/* убрал border bg-gray-100, т.к появляется черная рамка. Вместо этого написал border-gray-100 */}
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List ------ */}

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3_fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>{" "}
            {/* Для удаления продукта */}
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
