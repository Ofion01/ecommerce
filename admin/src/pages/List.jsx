// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../App";
// import axios from "axios";
// import { toast } from "react-toastify";
// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       //получаем список через API, и добавляем все продукты в переменную List(через setList)
//       const responce = await axios.get(backendUrl + "/api/product/list"); //в гайде не .post, а .get
//       if (responce.data.success) {
//         setList(responce.data.products);
//       } else {
//         toast.error(responce.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   //функция удаления продукта из бд
//   const removeProduct = async (id) => {
//     try {
//       const responce = await axios.post(
//         backendUrl + "/api/product/remove",
//         { id },
//         { headers: { token } }
//       );

//       if (responce.data.success) {
//         toast.success(responce.data.message);
//         //показываем новый список, после удаления продукта
//         await fetchList();
//       } else {
//         toast.error(responce.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   //запускаем функцию fetchList, когда происходит запуск страницы.
//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <>
//       <p className="mb-2">Список всех товаров</p>
//       <div className="flex flex-col gap">
//         {/* ------- List Table Title ------- */}
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border-gray-100 py-1 px-2  text-sm">
//           {" "}
//           {/* убрал border bg-gray-100, т.к появляется черная рамка. Вместо этого написал border-gray-100 */}
//           <b>Изображения</b>
//           <b>Название</b>
//           <b>Категория</b>
//           <b>Цена</b>
//           <b className="text-center"></b> {/* Убрал "Действие" */}
//         </div>

//         {/* ------ Product List ------ */}

//         {list.map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_3_fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm"
//             key={index}
//           >
//             <img className="w-12" src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>
//               {currency}
//               {item.price}
//             </p>
//             <p
//               onClick={() => removeProduct(item._id)}
//               className="text-right md:text-center cursor-pointer text-lg"
//             >
//               X
//             </p>{" "}
//             {/* Для удаления продукта */}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
// export default List;
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const categories = {
  Men: "Мужчины",
  Women: "Женщины",
};

const subCategories = {
  Jackets: "Пиджаки и жакеты",
  Shirts: "Рубашки и блузки",
  Trousers: "Брюки и юбки",
  Dressers: "Платья",
  Outerwear: "Пальто и плащи",
  Accessories: "Аксессуары",
  Shoes: "Обувь",
};
// Чтобы отображалась русская категория, а не Men/Women
const getCategoryRus = (categoryEng) => {
  if (!categoryEng) return categoryEng;
  return categories[categoryEng] || categoryEng;
};
const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        const productsWithRusCategory = response.data.products.map((item) => ({
          ...item,
          categoryRus: getCategoryRus(item.category),
        }));
        setList(productsWithRusCategory);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditData({
      name: item.name,
      category: item.category, // оригинал на английском
      subCategory: item.subCategory,
      price: item.price,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        {
          id,
          name: editData.name,
          category: editData.category,
          subCategory: editData.subCategory,
          price: editData.price,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Товар обновлен");
        setEditId(null);
        setEditData({});
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <p className="mb-2">Список всех товаров</p>
      <div className="flex flex-col gap-2">
        {/* Заголовок */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center border-gray-100 py-1 px-2 text-sm font-semibold">
          <div>Изображения</div>
          <div>Название</div>
          <div>Категория</div>
          <div>Подкатегория</div>
          <div>Цена</div>
          <div className="text-center">Действия</div>
        </div>

        {/* Список */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm"
          >
            <img className="w-12" src={item.image[0]} alt={item.name} />

            {/* Название */}
            {editId === item._id ? (
              <input
                className="border p-1 text-sm"
                value={editData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            ) : (
              <p>{item.name}</p>
            )}

            {/* Категория */}
            {editId === item._id ? (
              <select
                className="border p-1 text-sm w-full"
                value={editData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            ) : (
              <p>{item.categoryRus}</p> // показываем русский вариант
            )}

            {/* Подкатегория */}
            {editId === item._id ? (
              <select
                className="border p-1 text-sm w-full"
                value={editData.subCategory}
                onChange={(e) => handleChange("subCategory", e.target.value)}
              >
                {Object.entries(subCategories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            ) : (
              <p>{subCategories[item.subCategory] || item.subCategory}</p>
            )}

            {/* Цена */}
            {editId === item._id ? (
              <input
                type="number"
                className="border p-1 text-sm"
                value={editData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            ) : (
              <p>
                {currency}
                {item.price}
              </p>
            )}

            {/* Действия */}
            <div className="flex justify-center gap-3">
              {editId === item._id ? (
                <>
                  <button
                    onClick={() => saveProduct(item._id)}
                    className="text-green-600 cursor-pointer"
                    title="Сохранить"
                  >
                    ✔️
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-600 cursor-pointer"
                    title="Отмена"
                  >
                    ✖️
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600 cursor-pointer"
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-600 cursor-pointer"
                    title="Удалить"
                  >
                    ❌
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
