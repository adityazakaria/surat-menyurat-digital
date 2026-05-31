import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function DisposisiForm() {
  const { suratId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    kepadaUserId: "",
    instruksi: "",
    batasWaktu: "",
  });

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data.filter((u) => u.role === "staff")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/disposisi", { suratId: parseInt(suratId), ...form });
    navigate("/surat");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Buat Disposisi</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-lg"
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Tujuan Staff</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) =>
              setForm({ ...form, kepadaUserId: parseInt(e.target.value) })
            }
            required
          >
            <option value="">Pilih Staff</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nama} ({u.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Instruksi</label>
          <textarea
            rows="3"
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setForm({ ...form, instruksi: e.target.value })}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-1">Batas Waktu</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setForm({ ...form, batasWaktu: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Kirim Disposisi
        </button>
      </form>
    </div>
  );
}
