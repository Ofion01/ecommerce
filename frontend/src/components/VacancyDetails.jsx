import React, { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const VacancyDetails = () => {
  const { vacancyId } = useParams();
  const { vacancies, sendApplication } = useContext(ShopContext);
  const navigate = useNavigate();

  const vacancy = vacancies.find((v) => v._id === vacancyId);

  // Состояния формы
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleVacanciesClick = () => {
    navigate("/vacancies");
  };

  if (!vacancy) {
    return (
      <div className="p-6 text-center">
        <p>Вакансия не найдена</p>
        <Link
          to="/vacancies"
          className="text-blue-600 underline mt-4 inline-block"
        >
          Вернуться к списку вакансий
        </Link>
      </div>
    );
  }

  // Обработчик отправки формы — пока просто демонстрация
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lastName || !firstName || !email) {
      setSubmitStatus(
        "Пожалуйста, заполните обязательные поля (Фамилия, Имя, Email)."
      );
      return;
    }

    try {
      await sendApplication({
        vacancyId: vacancy._id,
        lastName,
        firstName,
        email,
        phone,
        description,
      });

      setSubmitStatus("Заявка успешно отправлена!");
      setLastName("");
      setFirstName("");
      setEmail("");
      setPhone("");
      setDescription("");
    } catch (error) {
      setSubmitStatus("Ошибка при отправке заявки. Попробуйте позже.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 ">
      {/* Левая колонка с описанием вакансии */}
      <div className="flex-1">
        <Title text1={vacancy.title} />
        <p className="text-gray-700 mb-4 text-lg">
          {vacancy.city} • {vacancy.type}
        </p>

        {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
          <section className="mb-6">
            <h2 className="text-3xl mb-3">Чем предстоит заниматься</h2>
            <ul className="list-disc list-inside marker:text-gray-500">
              {vacancy.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {vacancy.requirements && vacancy.requirements.length > 0 && (
          <section className="mb-6">
            <h2 className="text-3xl mb-3">Мы ожидаем</h2>
            <ul className="list-disc list-inside marker:text-gray-500">
              {vacancy.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {vacancy.offers && vacancy.offers.length > 0 && (
          <section className="mb-6">
            <h2 className="text-3xl mb-3">Мы предлагаем</h2>
            <ul className="list-disc list-inside marker:text-gray-500">
              {vacancy.offers.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {vacancy.development && vacancy.development.length > 0 && (
          <section className="mb-6">
            <h2 className="text-3xl mb-3">Развитие для каждого</h2>
            <ul className="list-disc list-inside marker:text-gray-500">
              {vacancy.development.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <button
          onClick={handleVacanciesClick}
          className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
        >
          Посмотреть вакансии
        </button>
      </div>

      {/* Правая колонка с формой */}
      <div className="flex-1 p-6 rounded-md shadow-md bg-white flex flex-col">
        <h2 className="text-2xl mb-4">Откликайтесь</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Фамилия"
          />
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Имя"
          />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Email"
          />
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Номер телефона"
          />
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            rows={6}
            className="w-full border border-gray-300 rounded px-3 py-2 overflow-hidden resize-none"
            placeholder="Здесь можно описать что-то особенное"
          />
          <button
            type="submit"
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default VacancyDetails;
