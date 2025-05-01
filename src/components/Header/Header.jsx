import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from "./../../context/AuthContext";
const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (!headerRef.current) return;
      
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => {
    if (!menuRef.current) return;
    
    menuRef.current.classList.toggle("show_menu");
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = menuRef.current.classList.contains("show_menu") ? "hidden" : "";
  };

  const handleNavClick = (path) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* logo  */}
            <div className="logo">
              <img src={logo} alt="" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
            </div>
            {/* logo end */}

            {/* menu  */}
            <div className="navigation" ref={menuRef}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                      onClick={() => handleNavClick(item.path)}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* menu end  */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {/* <Button className="btn secondary_btn">
        <Link to="/login">Login</Link>
      </Button> */}

                {user ? (
                  <>
                    <h5 className="mb-0 text-capitalize">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="link"
                      className="p-0 text-black text-decoration-none"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "orange",
                        borderColor: "orange",
                      }}
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile_menu" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <i className="ri-close-line"></i>
                ) : (
                  <i className="ri-menu-line"></i>
                )}
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
