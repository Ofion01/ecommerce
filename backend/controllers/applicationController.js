import applicationModel from "../models/applicationModel.js";

const addApplication = async (req, res) => {
  try {
    const { vacancyId, lastName, firstName, email, phone, description } =
      req.body;

    if (!vacancyId || !lastName || !firstName || !email) {
      return res.json({
        success: false,
        message: "Обязательные поля не заполнены.",
      });
    }

    const application = new applicationModel({
      vacancyId,
      lastName,
      firstName,
      email,
      phone,
      description,
    });

    await application.save();

    res.json({ success: true, message: "Заявка успешно отправлена" });
  } catch (error) {
    console.error("Ошибка при сохранении заявки:", error);
    res.json({ success: false, message: "Ошибка сервера." });
  }
};

const getlistApplication = async (req, res) => {
  try {
    const vacancyId = req.query.vacancyId;

    if (!vacancyId) {
      return res.json({ success: false, message: "vacancyId обязателен" });
    }

    const applications = await applicationModel.find({ vacancyId }).sort({
      date: -1,
    });

    res.json({ success: true, data: applications });
  } catch (error) {
    console.error("Ошибка при получении откликов:", error);
    res.json({ success: false, message: "Ошибка сервера" });
  }
};
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await applicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.json({ success: false, message: "Заявка не найдена" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
    res.json({ success: false, message: "Ошибка сервера" });
  }
};

export { addApplication, getlistApplication, updateApplicationStatus };
