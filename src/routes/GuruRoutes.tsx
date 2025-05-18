import React from "react";
import { Route } from "react-router-dom";
import Beranda from "../pages/guru/Beranda";
import Refrensi from "../pages/guru/Refrensi";
import PesertaDidik from "../pages/guru/PesertaDidik";
import TujuanPembelajaran from "../pages/guru/TujuanPembelajaran";

const GuruRoutes = () => {
  return (
    <>
      <Route path="beranda" element={<Beranda />} />
      <Route path="refrensi" element={<Refrensi />} />
      <Route path="pesertadidik" element={<PesertaDidik />} />
      <Route path="tujuanPembelajaran" element={<TujuanPembelajaran />} />
      {/* Tambah route lain untuk guru */}
    </>
  );
};
console.log("guru beranda");

export default GuruRoutes;
