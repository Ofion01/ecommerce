import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, //required(обязательно вводить)
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});

// mongoose.models.product || единичной инициализации, если доступно, то используй, если нет - то создай модуль с описаной выше схемой
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
