import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FcAndroidOs } from "react-icons/fc";
function Menu(props) {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Burmese Sports TV</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/livescore">Livescore</Nav.Link>
              <Nav.Link href="/standings">Standing</Nav.Link>
              <NavDropdown title="Matches" id="basic-nav-dropdown" bg="dark">
                <NavDropdown.Item href="/fixtures">Fixtures</NavDropdown.Item>
                <NavDropdown.Item href="/results">Results</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                href="https://drive.google.com/file/d/1z08SNI2IU1L-PX7AaRlaF_-9QhrtRxIm/view?usp=sharing"
                target="_blank"
              >
                <FcAndroidOs /> Download APK
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
}

export default Menu;