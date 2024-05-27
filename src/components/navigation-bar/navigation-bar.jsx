import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../img/logo.png';  // Adjust the path based on your file structure


export const NavigationBar = ({ user, movies, handleSearch, query, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
            src={logo}
            alt="Logo"
            width="90"
            height="100"
            className="d-inline-block align-top"
            style={{ marginRight: '10px' }} // Add some margin to the right of the image
          />
          <span>MyFlix App</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/'>
                  Movies
                </Nav.Link>
                <NavDropdown title="Profile" id="profile-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user">View Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user/settings">Update Profile</NavDropdown.Item>
            </NavDropdown>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
