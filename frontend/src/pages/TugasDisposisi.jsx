import React, { useEffect, useState } from "react";
import api from "../services/api";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function TugasDisposisi() {
  const [tugas, setTugas] = useState([]);

  useEffect(() => {
    api.get("/disposisi/tugas").then((res) => setTugas(res.data));
  }, []);

  const selesaikan = async (id) => {
    await api.put(`/disposisi/${id}/selesai`);
    setTugas(tugas.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tugas Disposisi</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Surat</th>
              <th>Instruksi</th>
              <th>Batas Waktu</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tugas.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4">{t.surat?.nomorSurat}</td>
                <td className="px-6 py-4">{t.instruksi}</td>
                <td className="px-6 py-4">
                  {new Date(t.batasWaktu).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => selesaikan(t.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 flex items-center gap-1 mx-auto"
                  >
                    <CheckCircleIcon className="w-4 h-4" /> Selesai
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
