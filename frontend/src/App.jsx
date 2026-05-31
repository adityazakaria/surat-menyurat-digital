import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SuratList from "./pages/SuratList";
import SuratDetail from "./pages/SuratDetail";
import InputSurat from "./pages/InputSurat";
import DisposisiForm from "./pages/DisposisiForm";
import TugasDisposisi from "./pages/TugasDisposisi";
import Arsip from "./pages/Arsip";
import UserManagement from "./pages/UserManagement";
import LaporanExport from "./pages/LaporanExport";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/surat" element={<SuratList />} />
            <Route path="/surat/detail/:id" element={<SuratDetail />} />
            <Route path="/surat/input" element={<InputSurat />} />
            <Route
              path="/disposisi/buat/:suratId"
              element={<DisposisiForm />}
            />
            <Route path="/tugas" element={<TugasDisposisi />} />
            <Route path="/arsip" element={<Arsip />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/laporan" element={<LaporanExport />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
