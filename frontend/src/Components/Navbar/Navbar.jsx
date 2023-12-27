import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "./logo2.jpg";
import { useUserId } from "../../Context/userContext";
import { useAuth } from "../../Context/authContext";

const Navbar = ({ onLogout }) => {
  const { id } = useUserId();
  const [menu, setmenu] = useState("Home");

  const navigate = useNavigate();
  const [auth, setauth] = useAuth();

  const handlelogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo2} alt="" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setmenu("Home")}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            Home
          </Link>
          {menu === "Home" ? <hr /> : <></>}
        </li>
        {auth.user && (
          <li onClick={() => setmenu("CreatePost")}>
            <Link
              to="/create"
              style={{ textDecoration: "none", color: "black" }}
            >
              Create Post
            </Link>
            {menu === "CreatePost" ? <hr /> : <></>}
          </li>
        )}

        {auth.user && (
          <li onClick={() => setmenu("YourPost")}>
            <Link
              to="/yourposts"
              style={{ textDecoration: "none", color: "black" }}
            >
              Your Posts
            </Link>
            {menu === "YourPost" ? <hr /> : <></>}
          </li>
        )}
      </ul>
      <div className="nav-login-bt">
        {!auth?.user ? (
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <button onClick={() => setmenu("")}>Login</button>
          </Link>
        ) : (
          <button onClick={handlelogout}>Logout</button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
