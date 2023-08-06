import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./Search";
import Track from "../components/pages/Track";
import Home from "../components/pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/track/:id" element={<Track />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
