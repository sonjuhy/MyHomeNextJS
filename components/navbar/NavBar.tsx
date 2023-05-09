import Link from "next/link"
import Image from "next/image"
import Logo from "/public/img/icon/MyhomeIcon.png"

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"

export default function NavBar(): JSX.Element{
    return(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
            <Image
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Link href='/test' className="nav-link">test</Link>
            <Link href='/image' className="nav-link">image</Link>
            <Link href='/video' className="nav-link">video</Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link href='/test' className="nav-link">test</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href='/image' className="nav-link">image</Link>
              </NavDropdown.Item>
              <NavDropdown.Item >
              <Link href='/video' className="nav-link">video</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style jsx>
        {
          `.nav-link{
            text-decoration-line: none;
          }`
        }
      </style>
    </Navbar>
    
    );
}