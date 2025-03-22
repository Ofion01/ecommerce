import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  //получаем токен с хедера
  const { token } = req.headers;
  if (!token) {
    //если не доступен
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    //decode token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //после декодировани мы можем получить user id, из userController.js
    req.body.userId = token_decode.id;
    //после сохранения id, обновляем card or Place order
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
