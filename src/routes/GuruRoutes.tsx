import React from "react";
import { Route } from "react-router-dom";
import Beranda from "../pages/guru/Beranda";
import Refrensi from "../pages/guru/Refrensi";
import PesertaDidik from "../pages/guru/PesertaDidik";
import TujuanPembelajaran from "../pages/guru/TujuanPembelajaran";
<<<<<<< HEAD
=======
import LingkupMateri from "../pages/guru/LingkupMateri";
>>>>>>> 42060f1e760926b4824314108397b017023c4628

const GuruRoutes = () => {
  return (
    <>
      <Route path="beranda" element={<Beranda />} />
      <Route path="refrensi" element={<Refrensi />} />
      <Route path="pesertadidik" element={<PesertaDidik />} />
      <Route path="tujuanPembelajaran" element={<TujuanPembelajaran />} />
<<<<<<< HEAD
=======
      <Route path="lingkup-materi" element={<LingkupMateri/>}   />
>>>>>>> 42060f1e760926b4824314108397b017023c4628
      {/* Tambah route lain untuk guru */}
    </>
  );
};
console.log("guru beranda");

export default GuruRoutes;
