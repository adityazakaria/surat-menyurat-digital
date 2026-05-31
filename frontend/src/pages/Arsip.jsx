import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Arsip() {
  const [surat, setSurat] = useState([]);
  useEffect(() => {
    api.get("/surat?status=completed").then((res) => setSurat(res.data));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Arsip Surat (Selesai)
      </h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">No. Surat</th>
              <th>Jenis</th>
              <th>Pengirim/Tujuan</th>
              <th>Perihal</th>
            </tr>
          </thead>
          <tbody>
            {surat.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">{s.nomorSurat}</td>
                <td>{s.jenis}</td>
                <td>{s.pengirimTujuan}</td>
                <td>{s.perihal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
