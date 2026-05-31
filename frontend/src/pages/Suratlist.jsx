import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function SuratList() {
  const [surat, setSurat] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    api.get(`/surat?search=${search}`).then((res) => setSurat(res.data));
  }, [search]);

  const statusBadge = (status) => {
    const cls =
      {
        draft: "bg-gray-200 text-gray-800",
        disposition: "bg-yellow-200 text-yellow-800",
        process: "bg-blue-200 text-blue-800",
        completed: "bg-green-200 text-green-800",
      }[status] || "bg-gray-200";
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${cls}`}>{status}</span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Surat</h1>
        <input
          type="text"
          placeholder="Cari nomor/perihal..."
          className="border rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                No. Surat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Jenis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Pengirim/Tujuan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Perihal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {surat.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {s.nomorSurat}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                  {s.jenis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {s.pengirimTujuan}
                </td>
                <td className="px-6 py-4 text-sm">{s.perihal}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {statusBadge(s.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    to={`/surat/detail/${s.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
