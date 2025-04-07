import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage.jsx";
// import { LoginPage } from "./pages/LoginPage.jsx";
// import { UserPage } from "./pages/UserPage.jsx";

// using routes create app
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;