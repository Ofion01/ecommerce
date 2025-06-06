import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// add product, total product list, remove product

//позже сделаем аутентификация только для админа, чтобы только он мог подключиться с к компонентам(addProduct,removeProduct)
// function for add product
const addProduct = async (req, res) => {
  try {
    //get products details
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    //image
    //если одно изображение не загружено = undefined(для этого изображения)
    const image1 = req.files.image1 && req.files.image1[0]; //если image1 доступно(имеется),выпонляется команда
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    //фильтр для undefined, чтобы не загружались пустые изображения(не имеющися на входе в respond) Благодяра этому можем загружать от 1 до 4 изображений, не обязательно 4
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price), //изначально получаем как String
      subCategory,
      bestseller: bestseller === "true" ? true : false, //изначально получаем как String
      sizes: JSON.parse(sizes), //изначально получаем как String
      image: imagesUrl, //получаем с cloud
      date: Date.now(),
    };

    // отрабатывается при отправке на сервер запроса(при respond)
    // console.log(imagesUrl); // узнали на каком url адресе хранится изображение
    // console.log(images) // под какими атрибутами хранятся данные
    // console.log(productData); // вывод в терминал информацию о добавленном товаре

    const product = new productModel(productData);

    //сохраняем продукт в DB
    await product.save();

    res.json({ success: true, message: "Товар добавлен" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error); //без этого не работает
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Товар удален" });
  } catch (error) {
    console.log(error); //без этого не работает
    res.json({ success: false, message: error.message });
  }
};

// function for single product(об отдельном)
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    //если нашли продукт, то выводим данные про него
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error); //без этого не работает
    res.json({ success: false, message: error.message });
  }
};
// обновление продукта в админке
// function for updating product (название, категория и цена)
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      category,
      subCategory,
      price,
      sizes, // добавляем sizes
      existingImages,
      newImages,
    } = req.body;

    if (!id || !name || !category || !subCategory) {
      return res.json({
        success: false,
        message: "Пожалуйста, заполните все обязательные поля",
      });
    }

    // Загружаем новые изображения (если есть)
    let uploadedNewImages = [];

    if (Array.isArray(newImages) && newImages.length > 0) {
      uploadedNewImages = await Promise.all(
        newImages.map(async (base64) => {
          const result = await cloudinary.uploader.upload(base64, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    const updateData = {
      name,
      category,
      subCategory,
      image: [...(existingImages || []), ...uploadedNewImages],
    };

    if (price !== undefined) {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return res.json({
          success: false,
          message: "Цена должна быть положительным числом",
        });
      }
      updateData.price = priceNum;
    }

    // Обработка sizes — если sizes есть, парсим и добавляем в updateData
    if (sizes !== undefined) {
      // sizes обычно приходит в виде JSON-строки, преобразуем в массив
      try {
        updateData.sizes = JSON.parse(sizes);
      } catch {
        // если это не строка JSON, возможно это уже массив
        updateData.sizes = sizes;
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.json({ success: false, message: "Товар не найден" });
    }

    res.json({
      success: true,
      message: "Товар обновлен",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
};
