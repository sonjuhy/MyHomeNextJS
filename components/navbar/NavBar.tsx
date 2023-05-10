import Link from "next/link"
import Image from "next/image"
import Logo from "/public/image/icon/MyhomeIcon-white.png"
import SignIn from "/public/image/icon/signIn.png"

import {useState} from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"

type NavProps = {
  back : string;
  mode : string;
}

export default function NavBar({back, mode}: NavProps): JSX.Element {

  return (
    // <Navbar bg="Transition" expand="lg" sticky="top" variant="dark" className="mainNavBar">
    <Navbar bg={back} expand="lg" sticky="top" variant={mode} className="mainNavBar">
      <Container className="container">
        <Navbar.Brand >
          <Link href="/" className="nav-link">
            <Image
              src={Logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            MyHome
          </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Link href='/image' className="nav-link">image</Link>
            <Link href='/video' className="nav-link">video</Link>
          </Nav>
          <div className="d-flex">
            <Image
              src={SignIn}
              width="20"
              height="20"
              className="d-inline-block align-top"
              alt="sign in logo"
            />
          </div>
        </Navbar.Collapse>
      </Container>
      <style jsx>
        {
          `
          .nav-link{
            text-decoration-line: none;
            color: ${mode == 'dark' ? 'white' : 'black'};
          }
          .container{
            color : white;
          }
          `
        }
      </style>
    </Navbar>
  );
}