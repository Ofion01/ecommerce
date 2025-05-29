import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Vacancies = () => {
  const { vacancies, vacanciesLoading, vacanciesError } =
    useContext(ShopContext);
  if (vacanciesLoading) {
    return (
      <div className="p-6 text-center">
        <Title text1={"Наши"} text2={"вакансии"} />
        <p>Загрузка вакансий...</p>
      </div>
    );
  }

  if (vacanciesError) {
    return (
      <div className="p-6 text-center text-red-600">
        <Title text1={"Наши"} text2={"вакансии"} />
        <p>{vacanciesError}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <Title text1={"Наши"} text2={"вакансии"} />
      </div>
      <div className="grid gap-4">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <div
              key={vacancy._id}
              className="border p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h2 className="font-medium text-2xl mt-2">{vacancy.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {vacancy.city} • {vacancy.type}
                </p>
              </div>
              <Link
                to={`/vacancies/${vacancy._id}`}
                className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
              >
                Подробнее
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">Нет доступных вакансий.</p>
        )}
      </div>
    </div>
  );
};

export default Vacancies;
