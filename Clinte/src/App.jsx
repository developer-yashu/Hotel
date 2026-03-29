import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from "./Component/Api";
import ViewPage from "./Component/ViewPage";
import BookingPage from "./Page.jsx/BookingPage ";
import History from "./Page.jsx/History";
import Wishlist from "./Component/Wishlist";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Api />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/hotels/:id" element={<ViewPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/history" element={<History/>} />
        <Route path="/wishlist" element={ <Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
