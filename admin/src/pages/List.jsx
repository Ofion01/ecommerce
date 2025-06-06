import React, { useEffect, useState, useRef } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const categories = {
  Men: "Мужчины",
  Women: "Женщины",
};

const subCategories = {
  Сostumes: "Костюмы",
  Jackets: "Пиджаки и жакеты",
  Shirts: "Рубашки и блузки",
  Trousers: "Брюки и юбки",
  Dresses: "Платья",
  Outerwear: "Пальто и плащи",
  Accessories: "Аксессуары",
  Shoes: "Обувь",
};

const getCategoryRus = (categoryEng) => {
  if (!categoryEng) return categoryEng;
  return categories[categoryEng] || categoryEng;
};

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editImages, setEditImages] = useState([]);

  const fileInputRefs = useRef([]);

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
      category: item.category,
      subCategory: item.subCategory,
      price: item.price,
    });
    setEditImages(item.image.slice(0, 4));
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
    setEditImages([]);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const removeImageAt = (index) => {
    setEditImages((imgs) => imgs.filter((_, i) => i !== index));
  };

  const onFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const newImages = [...editImages];
      newImages[index] = ev.target.result;
      setEditImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  const onImageClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const saveProduct = async (id) => {
    try {
      const existingImages = editImages.filter((img) => img.startsWith("http"));
      const newImages = editImages.filter((img) => !img.startsWith("http"));

      const response = await axios.post(
        backendUrl + "/api/product/update",
        {
          id,
          name: editData.name,
          category: editData.category,
          subCategory: editData.subCategory,
          price: editData.price,
          existingImages,
          newImages,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Товар обновлен");
        setEditId(null);
        setEditData({});
        setEditImages([]);
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
        <div
          className={`hidden md:grid items-center border-gray-100 py-1 px-2 text-sm font-semibold`}
          style={{
            gridTemplateColumns: editId
              ? "4fr 3fr 1fr 1fr 1fr 1fr"
              : "minmax(100px, 1fr) minmax(150px, 2fr) minmax(120px, 1.5fr) minmax(120px, 1.5fr) minmax(80px, 1fr) minmax(100px, 1fr)",
          }}
        >
          <div className="truncate">Изображения</div>
          <div className="truncate">Название</div>
          <div className="truncate">Категория</div>
          <div className="truncate">Подкатегория</div>
          <div className="truncate">Цена</div>
          <div className="text-center truncate">Действия</div>
        </div>

        {/* Список */}
        {list.map((item, index) => {
          const isEdit = editId === item._id;

          return (
            <div
              key={index}
              className="grid items-center gap-2 py-1 px-2 border border-gray-200 text-sm"
              style={{
                gridTemplateColumns: isEdit
                  ? "4fr 3fr 1fr 1fr 1fr 1fr"
                  : "minmax(100px, 1fr) minmax(150px, 2fr) minmax(120px, 1.5fr) minmax(120px, 1.5fr) minmax(80px, 1fr) minmax(100px, 1fr)",
              }}
            >
              {/* Изображения */}
              <div className="flex gap-2">
                {isEdit ? (
                  <>
                    {editImages.map((imgSrc, i) => (
                      <div key={i} className="relative">
                        <img
                          src={imgSrc}
                          alt={`img-${i}`}
                          className="w-20 h-20 object-cover cursor-pointer border border-gray-300 rounded"
                          onClick={() => onImageClick(i)}
                          title="Клик для замены"
                        />
                        <button
                          onClick={() => removeImageAt(i)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
                          title="Удалить"
                        >
                          ×
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={(el) => (fileInputRefs.current[i] = el)}
                          onChange={(e) => onFileChange(i, e)}
                        />
                      </div>
                    ))}
                    {editImages.length < 4 && (
                      <div className="relative">
                        <button
                          onClick={() => {
                            const newIndex = editImages.length;
                            if (fileInputRefs.current[newIndex]) {
                              fileInputRefs.current[newIndex].click();
                            }
                          }}
                          className="w-20 h-20 border border-dashed border-gray-400 rounded text-gray-500 flex items-center justify-center cursor-pointer text-xl font-bold"
                          title="Добавить изображение"
                        >
                          +
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={(el) =>
                            (fileInputRefs.current[editImages.length] = el)
                          }
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setEditImages((imgs) => [
                                ...imgs,
                                ev.target.result,
                              ]);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <img
                      src={item.image[0]}
                      alt={`${item.name} img-0`}
                      className="w-20 h-20 object-cover border border-gray-300 rounded"
                    />
                  </>
                )}
              </div>

              {/* Название */}
              {isEdit ? (
                <input
                  className="border p-1 text-sm w-full"
                  value={editData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <div className="break-words line-clamp-2" title={item.name}>
                  {item.name}
                </div>
              )}

              {/* Категория */}
              {isEdit ? (
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
                <div className="truncate" title={item.categoryRus}>
                  {item.categoryRus}
                </div>
              )}

              {/* Подкатегория */}
              {isEdit ? (
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
                <div
                  className="truncate"
                  title={subCategories[item.subCategory] || item.subCategory}
                >
                  {subCategories[item.subCategory] || item.subCategory}
                </div>
              )}

              {/* Цена */}
              {isEdit ? (
                <input
                  type="number"
                  className="border p-1 text-sm w-full"
                  value={editData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              ) : (
                <div className="truncate">
                  {currency}
                  {item.price}
                </div>
              )}

              {/* Действия */}
              <div className="flex justify-center gap-3">
                {isEdit ? (
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
          );
        })}
      </div>

      {/* Глобальные стили для выравнивания */}
      <style jsx global>{`
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
};

export default List;
