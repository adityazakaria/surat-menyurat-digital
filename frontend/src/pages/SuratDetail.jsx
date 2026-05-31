import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function SuratDetail() {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);

  useEffect(() => {
    api.get(`/surat/${id}`).then((res) => setSurat(res.data));
  }, [id]);
  if (!surat) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/surat" className="text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Detail Surat</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold">Nomor Surat</dt>
            <dd>{surat.nomorSurat}</dd>
          </div>
          <div>
            <dt className="font-semibold">Jenis</dt>
            <dd className="capitalize">{surat.jenis}</dd>
          </div>
          <div>
            <dt className="font-semibold">Pengirim/Tujuan</dt>
            <dd>{surat.pengirimTujuan}</dd>
          </div>
          <div>
            <dt className="font-semibold">Tanggal Surat</dt>
            <dd>{new Date(surat.tanggalSurat).toLocaleDateString()}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-semibold">Perihal</dt>
            <dd>{surat.perihal}</dd>
          </div>
          <div>
            <dt className="font-semibold">Status</dt>
            <dd>
              <span
                className={`px-2 py-1 rounded-full text-xs ${surat.status === "completed" ? "bg-green-200" : "bg-yellow-200"}`}
              >
                {surat.status}
              </span>
            </dd>
          </div>
          {surat.fileUrl && (
            <div>
              <dt className="font-semibold">File</dt>
              <dd>
                <a
                  href={surat.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 flex items-center gap-1"
                >
                  <DocumentTextIcon className="w-4 h-4" /> Lihat file
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
