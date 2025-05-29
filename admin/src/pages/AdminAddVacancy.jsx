import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddVacancy = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("Офис"); // или "Удаленно"
  const [responsibilities, setResponsibilities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [development, setDevelopment] = useState([]);

  const handleListChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addToList = (setter) => {
    setter((prev) => [...prev, ""]);
  };

  const removeFromList = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title,
        description,
        city,
        type,
        responsibilities,
        requirements,
        offers,
        development,
      };

      const res = await axios.post(`${backendUrl}/api/vacancies/add`, body, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("Вакансия успешно добавлена");
        setTitle("");
        setDescription("");
        setCity("");
        setType("Офис");
        setResponsibilities([]);
        setRequirements([]);
        setOffers([]);
        setDevelopment([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Ошибка при добавлении вакансии");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 flex flex-col gap-4"
    >
      {/* <h2 className="text-xl font-semibold">Добавить вакансию</h2> */}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название вакансии"
        className="border px-3 py-2"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        className="border px-3 py-2"
        required
      />

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Город"
        className="border px-3 py-2"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border px-3 py-2"
      >
        <option value="Офис">Офис</option>
        <option value="Удаленно">Удаленно</option>
        <option value="Гибрид">Гибрид</option>
      </select>

      {/* Массивы */}

      {[
        ["Чем предстоит заниматься", responsibilities, setResponsibilities],
        ["Мы ожидаем", requirements, setRequirements],
        ["Мы предлагаем", offers, setOffers],
        ["Развитие для каждого", development, setDevelopment],
      ].map(([label, list, setter]) => (
        <div key={label}>
          <p className="font-medium">{label}</p>
          {list.map((item, i) => (
            <div key={i} className="flex gap-2 my-1">
              <input
                type="text"
                value={item}
                onChange={(e) => handleListChange(setter, i, e.target.value)}
                className="border px-3 py-1 w-full"
              />
              <button
                type="button"
                onClick={() => removeFromList(setter, i)}
                className="text-red-500"
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToList(setter)}
            className="text-blue-700"
          >
            + Добавить
          </button>
        </div>
      ))}

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        ДОБАВИТЬ ВАКАНСИЮ
      </button>
    </form>
  );
};

export default AddVacancy;
