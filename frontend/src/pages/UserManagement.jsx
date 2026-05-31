import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "staff",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/users/${editing.id}`, form);
      setEditing(null);
    } else {
      await api.post("/users", form);
    }
    setForm({ nama: "", email: "", password: "", role: "staff" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditing(user);
    setForm({
      nama: user.nama,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus user ini?")) {
      await api.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manajemen User</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Edit User" : "Tambah User Baru"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Nama"
            className="border rounded-lg px-3 py-2"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!editing}
          />
          <select
            className="border rounded-lg px-3 py-2"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="pimpinan">Pimpinan</option>
          </select>
          <div className="md:col-span-4 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editing ? "Update" : "Simpan"}
            </button>
            {editing && (
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                onClick={() => {
                  setEditing(null);
                  setForm({ nama: "", email: "", password: "", role: "staff" });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">{user.nama}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-5 h-5 inline" />
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
