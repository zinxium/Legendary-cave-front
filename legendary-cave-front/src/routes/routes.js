
import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/home";
import Gallery from "../pages/galerie";
import About from "../pages/about";
import Contact from "../pages/contact";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Homepage />} />
		<Route path="/galerie" element={<Gallery />} />
		<Route path="/about" element={<About />} />
		<Route path="/contact" element={<Contact />} />
	</Routes>
);

export default AppRoutes;
