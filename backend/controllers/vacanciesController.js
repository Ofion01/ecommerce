import vacancyModel from "../models/vacanciesModel.js";
import applicationModel from "../models/applicationModel.js";
// Добавление вакансии
const addVacancy = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      type,
      responsibilities = [],
      requirements = [],
      offers = [],
      development = [],
    } = req.body;

    const vacancyData = {
      title,
      description,
      city,
      type,
      date: Date.now(),
      responsibilities,
      requirements,
      offers,
      development,
      isApproved,
    };

    const vacancy = new vacancyModel(vacancyData);
    await vacancy.save();

    res.json({ success: true, message: "Вакансия добавлена" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Вывод всех вакансий
const listVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyModel.find({});
    res.json({ success: true, data: vacancies }); // обёртка в объект
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Удаление вакансии и связанных заявок
const removeVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVacancy = await vacancyModel.findByIdAndDelete(id);

    if (!deletedVacancy) {
      return res
        .status(404)
        .json({ success: false, message: "Вакансия не найдена" });
    }

    await applicationModel.deleteMany({ vacancyId: id });

    res.json({ success: true, message: "Вакансия и заявки удалены" });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

// Получаем одиночную вакансию
const singleVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.params;
    const vacancy = await vacancyModel.findById(vacancyId);
    res.json({ success: true, vacancy });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// список апрувнытых вакансий
const getVacanciesWithApprovalStatus = async (req, res) => {
  try {
    const vacancies = await vacancyModel.find();

    // Собираем статус "есть ли одобренные" по каждой вакансии
    const result = await Promise.all(
      vacancies.map(async (vacancy) => {
        const hasApproved = await applicationModel.exists({
          vacancyId: vacancy._id,
          status: "Одобрена",
        });

        return {
          ...vacancy._doc,
          hasApproved: !!hasApproved,
        };
      })
    );

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Ошибка при получении вакансий:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};
const listUnapprovedVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyModel.find();

    // фильтруем те, где НЕТ одобренных заявок
    const result = [];

    for (const vacancy of vacancies) {
      const hasApproved = await applicationModel.exists({
        vacancyId: vacancy._id,
        status: "Одобрена",
      });

      if (!hasApproved) {
        result.push(vacancy);
      }
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Ошибка при получении неодобренных вакансий:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};
export {
  addVacancy,
  listVacancies,
  removeVacancy,
  singleVacancy,
  getVacanciesWithApprovalStatus,
  listUnapprovedVacancies,
};
