import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const VacancyApplications = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем название вакансии, если оно было передано через навигацию
  const vacancyTitle = location.state?.title || "Вакансия";

  const [applications, setApplications] = useState([]);
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { token } }
      );

      if (res.data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        toast.success("Статус обновлён");
      } else {
        toast.error("Не удалось обновить статус");
      }
    } catch (error) {
      toast.error("Ошибка при обновлении статуса");
    }
  };
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/applications?vacancyId=${id}`,
          { headers: { token } }
        );
        if (res.data.success) {
          setApplications(res.data.data);
        } else {
          toast.error("Не удалось загрузить отклики");
        }
      } catch (error) {
        toast.error("Ошибка сервера при загрузке откликов");
      }
    };

    fetchApplications();
  }, [id, token]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← Назад к вакансиям
      </button>

      <h1 className="text-2xl font-semibold mb-4">
        Отклики на вакансию: {vacancyTitle}
      </h1>

      {applications.length === 0 ? (
        <p>Нет откликов на эту вакансию.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Фамилия</th>
              <th className="border px-4 py-2">Имя</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Телефон</th>
              <th className="border px-4 py-2">Описание</th>
              <th className="border px-4 py-2">Дата</th>
              <th className="border px-4 py-2">Статус</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{a.lastName}</td>
                <td className="border px-4 py-2">{a.firstName}</td>
                <td className="border px-4 py-2">{a.email}</td>
                <td className="border px-4 py-2">{a.phone || "—"}</td>
                <td className="border px-4 py-2">{a.description || "—"}</td>
                <td className="border px-4 py-2">
                  {new Date(a.date).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <select
                    value={a.status || "Новая"}
                    onChange={(e) => handleStatusChange(a._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option>Новая</option>
                    <option>В процессе</option>
                    <option>Одобрена</option>
                    <option>Отклонена</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VacancyApplications;
