import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Create from "./Components/Create/Create";
import Yourpost from "./Components/Yourpost/Yourpost";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import Edit from "./Components/Create/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IdProvider } from "./Context/IdContext";
import { useEffect, useState } from "react";
import { UserProvider } from "./Context/userContext";
import Pagenotfound from "./Components/Pagenotfound.jsx/Pagenotfound";
import { AuthProvider } from "./Context/authContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AuthProvider>
          <IdProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<Create />} />
                <Route path="/yourposts" element={<Yourpost />} />

                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/*" element={<Pagenotfound />} />
              </Routes>
            </BrowserRouter>
          </IdProvider>
        </AuthProvider>
      </UserProvider>
    </div>
  );
}

export default App;
