import React from "react";
import { Route } from "react-router-dom";
import Beranda from "../pages/guru/Beranda";
import Refrensi from "../pages/guru/Refrensi";
import PesertaDidik from "../pages/guru/PesertaDidik";

const GuruRoutes = () => {
  return (
    <>
      <Route path="beranda" element={<Beranda />} />
      <Route path="refrensi" element={<Refrensi />} />
      <Route path="pesertadidik" element={<PesertaDidik/>}/>
      {/* Tambah route lain untuk guru */}
    </>
  );
};
console.log("guru beranda");

export default GuruRoutes;
