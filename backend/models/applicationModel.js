import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  vacancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vacancies",
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Новая", "В процессе", "Одобрена", "Отклонена"],
    default: "Новая",
  },
});

const applicationModel = mongoose.model("applications", applicationSchema);

export default applicationModel;
