import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VacancyList = ({ token }) => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);

  const fetchVacancies = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/vacancies/list-with-status",
        {
          headers: { token },
        }
      );
      if (res.data.success && Array.isArray(res.data.data)) {
        setVacancies(res.data.data);
      } else {
        toast.error("Не удалось загрузить вакансии: неверный формат данных");
      }
    } catch (error) {
      toast.error("Ошибка сервера при загрузке вакансий");
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить эту вакансию?")) return;

    try {
      const res = await axios.delete(
        backendUrl + "/api/vacancies/delete/vacancy/${id}", // id в URL
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("Вакансия удалена");
        setVacancies((prev) => prev.filter((v) => v._id !== id));
      } else {
        toast.error("Ошибка при удалении");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ошибка сервера при удалении");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Название вакансии</th>
            <th className="border px-4 py-2">Одобрено</th>
            <th className="border px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((v) => (
            <tr key={v._id} className="hover:bg-gray-100">
              <td
                className="border px-4 py-2 hover:underline cursor-pointer"
                onClick={() =>
                  navigate(`/vacancies/${v._id}/applications`, {
                    state: { title: v.title },
                  })
                }
              >
                {v.title}
              </td>
              <td className="border px-4 py-2 text-center">
                {v.hasApproved ? "✅" : "—"}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(v._id)}
                  className="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacancyList;
