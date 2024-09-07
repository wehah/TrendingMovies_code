import "../styles/navbar.css";
import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { House } from "react-bootstrap-icons";
import { Film } from "react-bootstrap-icons";
import { Tv } from "react-bootstrap-icons";
import { Gear } from "react-bootstrap-icons";
import { List } from "react-bootstrap-icons";
import { X } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import logoImage from "../images/Mohamed_Ali_logoVersion2.svg";
//src\images\Mohamed_Ali_logoVersion2.svg

//toggle menu close and open
function Navbar({ onPageChange, openDisplay, openTheModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //movies tv home buttons close navbar
  const ClosedNavbar = () => {
    setIsOpen(!isOpen);
  };

  const userClick = () => {
    setIsOpen(!isOpen);
    openTheModal();
  };

  return (
    <nav>
      <div>
        <div className="logo">
          <div className="humberger" onClick={toggleNavbar}>
            {isOpen ? <X /> : <List />}
          </div>

          <div className="theLogo">
            {/* <Plus onClick ={openDisplay}  className="plusSVG" /> */}
            <img
              className="logoImage"
              src={logoImage}
              title={"Mohamed Ali"}
              alt={"Mohamed_Ali_logo.svg"}
            />
          </div>
        </div>
      </div>

      <div className={`navbarFlex navbar row ${isOpen ? "open" : ""}`}>
        {/* <p>Navbar</p> */}

        <div className="col-12  mt-5">
          <div
            className="profileIcon userName"
            title="UserName"
            onClick={userClick}
          >
            <p className="p-0 m-0 ">MA</p>
          </div>
        </div>
        <div className={`col-12   navIcons navbar ${isOpen ? "open" : ""}`}>
          <Link className="navLink" to="/">
            {" "}
            <House onClick={ClosedNavbar} /> {<p className="pb-2 m-0">Home</p>}{" "}
          </Link>
          <Link className="navLink" to="Movies">
            {" "}
            <Film onClick={ClosedNavbar} /> {<p className="pb-2 m-0">Movies</p>}{" "}
          </Link>
          <Link className="navLink" to="Tv">
            {" "}
            <Tv onClick={ClosedNavbar} /> {<p className="pb-2 m-0">Shows</p>}{" "}
          </Link>
        </div>
        <div className="col-12 navIcons">
          <Gear />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
