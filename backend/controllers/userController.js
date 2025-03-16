import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";
// res - respond

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  //we can get the userid and password, if sign in - generate 1 token
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      //если user не доступен
      return res.json({ success: false, message: "User doesn't exists" });
    }

    //если функция успешно инициализировалось то мы сравниваем пароль с паролем в юзера в ДБ
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" }); //неправльные дааные
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  //   res.json({ msg: "Register API Working" }); //для проверки вызовода из server.js api endpoints
  try {
    const { name, email, password } = req.body;

    // проверка: существует ли пользовать? (checking user already exists or not)
    const exists = await userModel.findOne({ email }); //проверка по email
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // проверка формата(валидация) электронной почты и надежного пароля
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      // добавить доп проверки на капс буквы и т.п
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //Перед созданием учетной записи нам необходимо ввести этот пароль и восстановить хешированный пароль - в дб пароль храниться в виде хеша

    // hashing user password
    const salt = await bcrypt.genSalt(10); // 10 -кол-во символов в генерируемом пароле
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    //сохраняем юзера в DB
    const user = await newUser.save();

    //проверка токена, может ли он войти в приложение(на сайт)
    const token = createToken(user._id); //autogen in mongodb

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
// данные от админки лежат в .env
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      //send token to the admin user
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
