import express from "express";
import {
  addVacancy,
  listVacancies,
  removeVacancy,
  singleVacancy,
  getVacanciesWithApprovalStatus,
  listUnapprovedVacancies,
} from "../controllers/vacanciesController.js";

const vacanciesRouter = express.Router();

// Добавляем новую вакансию
vacanciesRouter.post("/add", addVacancy); // позже добавить аутентификацию админа

// Получаем список всех вакансий
vacanciesRouter.get("/list", listVacancies);

// Удаляем вакансию
vacanciesRouter.delete("/delete/vacancy/:id", removeVacancy); // позже добавить аутентификацию админа

// Получаем одиночную вакансию по id через params
vacanciesRouter.get("/get/:vacancyId", singleVacancy);

vacanciesRouter.get("/list-with-status", getVacanciesWithApprovalStatus);
// только не одобренные вакансии
vacanciesRouter.get("/public", listUnapprovedVacancies);

export default vacanciesRouter;
