import React, { useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function LaporanExport() {
  const [loading, setLoading] = useState(false);
  const [periode, setPeriode] = useState({ start: "", end: "" });

  const exportPDF = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/laporan/pdf?startDate=${periode.start}&endDate=${periode.end}`,
        { responseType: "blob" },
      );
      saveAs(res.data, `laporan_surat_${periode.start}_to_${periode.end}.pdf`);
    } catch {
      alert("Gagal export PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Export Laporan PDF
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              onChange={(e) =>
                setPeriode({ ...periode, start: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Akhir
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setPeriode({ ...periode, end: e.target.value })}
            />
          </div>
          <button
            onClick={exportPDF}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />{" "}
            {loading ? "Memproses..." : "Export PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
