import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected"); //вывели в терминал, если успешно загружена DB
  });

  //подключаем пакет mongoo's  с mongodb atlas server
  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`); //создали дб ecommerce
};

export default connectDB;
