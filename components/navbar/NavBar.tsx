import Link from "next/link"
import Image from "next/image"
import Logo from "/public/image/icon/MyHomeIcon-white.png"
import LogoColor from "/public/image/icon/MyhomeIcon.png"
import Login from "/public/image/icon/login.png"
import LoginWhite from "/public/image/icon/login-white.png"
import Logout from "/public/image/icon/logout.png"
import LogoutWhite from "/public/image/icon/logout-white.png"

import {useState} from 'react';
import { Container, Nav, Navbar } from "react-bootstrap"
import { useRouter } from "next/router"

type NavProps = {
  back : string;
  mode : string;
  sign : boolean;
}

export default function NavBar({back, mode, sign}: NavProps): JSX.Element {
  const [logoSrc, setLogoSrc] = useState(mode === 'dark' ? Logo : LogoColor);
  const [signLogo, setSignLogo] = useState(mode === 'dark' ? LoginWhite : Login);
  const [logOutLogo, setLogOutLogo] = useState(mode === 'dark' ? LogoutWhite : Logout);
  const router = useRouter();

  function logOut(){
    console.log('logout');
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    if(accessToken !== null){
      sessionStorage.removeItem('accessToken');
      router.reload();
    }
  }

  return (
    <Navbar bg={back} expand="lg" sticky="top" variant={mode} className="mainNavBar">
      <Container className="container">
        <Navbar.Brand >
          <Link href="/" className="nav-link">
            <Image
              src={logoSrc}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              priority
            />
            MyHome
          </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href='/about' className="nav-link">about</Link>
          </Nav>
          <div className="d-flex">
            {!sign && (
              <Link href='/signin'>
                <Image
                  src={signLogo}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="sign in logo"
                />
            </Link>
            )}
            {sign && (
              <a onClick={logOut} className="logout">
              <Image
                  src={logOutLogo}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="log out logo"
                />
            </a>
            )}
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
          .logout {
            cursor: pointer;
          }
          `
        }
      </style>
    </Navbar>
  );
}