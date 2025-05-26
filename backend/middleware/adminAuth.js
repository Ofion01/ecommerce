// если нужно добавить/убрать продукт
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers; //получаем токен админ логина
    //если токен доступен, значит админ авторизовался, если нет, то выводим сообщение о том, что user не авторизовался для доступа в этот api
    if (!token) {
      return res.json({
        success: false,
        message: "Доступ запрещён. Авторизуйтесь повторно",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //token состоит из email+password (см в userController)
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Доступ запрещён. Авторизуйтесь повторно",
      });
    }
    next();
  } catch (error) {
    console.log();
    res.json({ success: false, message: error.mesage });
  }
};

export default adminAuth;
