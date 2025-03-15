import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //unique - уникальные данные. Если мыло зарегано, на это же мыло зарегаться не получиться.
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } //создаем cartData(инициализация пустого объекта), если мыло уникально
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
