import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ThankYou from "../pages/ThankYou";
import SearchResultList from "../pages/SearchResultList";
import BookingSuccess from "../pages/BookingSuccess";
import Booking from "../pages/Booking";
import About from "../pages/About";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home/*" element={<Layout><Home /></Layout>} />
      <Route path="/about/*" element={<Layout><About /></Layout>} />
      <Route path="/tours/*" element={<Layout><Tours /></Layout>} />
      <Route path="/tours/search" element={<Layout><SearchResultList /></Layout>} />
      <Route path="/tours/:id" element={<Layout><TourDetails /></Layout>} />
      <Route path="/tours/:id/booking" element={<Layout><Booking /></Layout>} />
      <Route path="/login/*" element={<Layout><Login /></Layout>} />
      <Route path="/register/*" element={<Layout><Register /></Layout>} />
      <Route path="/thank-you/*" element={<Layout><ThankYou /></Layout>} />
      <Route path="/booking-success/*" element={<Layout><BookingSuccess /></Layout>} />
    </Routes>
  );
};

export default Routers;
