import React from "react";
import { Route } from "react-router-dom";
import Beranda from "../pages/guru/Beranda";
import Refrensi from "../pages/guru/Refrensi";

const GuruRoutes = () => {
  return (
    <>
      <Route path="beranda" element={<Beranda />} />
      <Route path="refrensi" element={<Refrensi />} />
      {/* Tambah route lain untuk guru */}
    </>
  );
};
console.log("guru beranda");

export default GuruRoutes;
