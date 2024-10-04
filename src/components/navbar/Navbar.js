import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search from "../../assets/search_icon.svg";
import bell from "../../assets/bell_icon.svg";
import profile from "../../assets/profile_img.png";
import caret from "../../assets/caret_icon.svg";
import { logout } from "../../Firebase";
const Navbar = () => {
  const navRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      console.log(navRef.current.nodeType); // Should output 1
      console.log(navRef.current.nodeName); // Should output the element's name, e.g., "DIV"
      console.log(navRef.current.classList); // Should not be null

      if (navRef.current && window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else if (navRef.current) {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My Lists</li>
          <li>Browse By Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" className="icons" />
        <p className="search">Search</p>
        <img src={bell} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile} alt="" className="profile" />
          <img src={caret} alt="" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              sign out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
