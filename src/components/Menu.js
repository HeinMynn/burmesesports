import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

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
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
}

export default Menu;