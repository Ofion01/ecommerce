import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import vacanciesRouter from "./routes/vacanciesRoute.js";
import applicationRouter from "./routes/applicationRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000; //старт бэка на этом порту
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()); //любой запрос будет конвертировться в json
app.use(cors()); //получаем доступ к бэку через любой api
// Разрешаем preflight (OPTIONS) запросы для всех маршрутов
app.options("*", cors());
// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/vacancies", vacanciesRouter);
app.use("/api/applications", applicationRouter);

app.get("/", (req, res) => {
  //вывели сообщение в браузере
  //request,respond
  res.send("API Working");
});

// start express server
app.listen(port, () => console.log("Server started on PORT : " + port));

//для запуска server : в терминал npm run server
