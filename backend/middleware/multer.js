import multer from "multer";
//сделан для того, чтобы мы могли отправлять изображение при добавлении продукта в db
//wear - слой
//storage config
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
