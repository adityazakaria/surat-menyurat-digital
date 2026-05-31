import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function InputSurat() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomorSurat: "",
    jenis: "masuk",
    tanggalSurat: "",
    pengirimTujuan: "",
    perihal: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    try {
      await api.post("/surat", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/surat");
    } catch {
      alert("Gagal input surat");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Input Surat</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Nomor Surat</label>
            <input
              name="nomorSurat"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Jenis</label>
            <select
              name="jenis"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
            >
              <option value="masuk">Masuk</option>
              <option value="keluar">Keluar</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Tanggal Surat</label>
            <input
              type="date"
              name="tanggalSurat"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Pengirim/Tujuan</label>
            <input
              name="pengirimTujuan"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Perihal</label>
            <textarea
              name="perihal"
              rows="3"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Upload File</label>
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.png"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
