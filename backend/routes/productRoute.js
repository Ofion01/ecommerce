import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRoute = express.Router();

//upload - для изображений
productRoute.post(
  "/add",
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
productRoute.post("/remove", removeProduct);
productRoute.post("/list", listProducts);
productRoute.post("/single", singleProduct);

export default productRoute;
