import mongoose from "mongoose";

const vacanciesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, // краткое описание вакансии
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  type: {
    type: String, // например full-time, part-time, remote
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  responsibilities: {
    type: [String], // обязанности
    default: [],
  },
  requirements: {
    type: [String], // ожидания, требования к кандидату
    default: [],
  },
  offers: {
    type: [String], // что предлагаем
    default: [],
  },
  development: {
    type: [String], // развитие и обучение
    default: [],
  },
});

const vacanciesModel = mongoose.model("vacancies", vacanciesSchema);

export default vacanciesModel;
