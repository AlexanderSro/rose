import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/images/logonou-nou.svg"
                alt="Rose Logo"
                height="50"
                className="d-inline-block align-top"
                style={{ borderRadius: "70px" }}
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to={"/shop"}>
                <Nav.Link>Magazin</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/about"}>
                <Nav.Link>Despre noi</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FontAwesomeIcon icon={faShoppingCart} /> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      {String(userInfo.name || userInfo.email || "User")}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link onClick={logoutHandler}>Deconectati-va</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} /> Cont
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
