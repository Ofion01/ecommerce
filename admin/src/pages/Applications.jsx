import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ApplicationsList = ({ token }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/applications", {
          headers: { token },
        });

        if (response.data.success) {
          setApplications(response.data.data);
        } else {
          toast.error(response.data.message || "Ошибка при загрузке заявок");
        }
      } catch (error) {
        toast.error("Ошибка сети или сервера");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  if (loading) {
    return <p>Загрузка заявок...</p>;
  }

  if (applications.length === 0) {
    return <p>Заявок пока нет.</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl mb-6">Заявки на вакансии</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Вакансия</th>
            <th className="border border-gray-300 px-4 py-2">Фамилия</th>
            <th className="border border-gray-300 px-4 py-2">Имя</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Телефон</th>
            <th className="border border-gray-300 px-4 py-2">Описание</th>
            <th className="border border-gray-300 px-4 py-2">Дата</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {app.vacancyId ? app.vacancyId.title : "—"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {app.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {app.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{app.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {app.phone || "—"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {app.description || "—"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(app.date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
