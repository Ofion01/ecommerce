import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const productRoute = express.Router();

//upload - для изображений
productRoute.post(
  "/add",
  adminAuth, //доступно только для админа
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRoute.post("/remove", adminAuth, removeProduct);
productRoute.get("/list", listProducts);
productRoute.post("/single", singleProduct);
productRoute.post("/update", adminAuth, updateProduct);

export default productRoute;
