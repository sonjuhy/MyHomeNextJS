import Link from "next/link";
import Image from "next/image";
import Logo from "/public/image/icon/MyHomeIcon-white.png";
import LogoColor from "/public/image/icon/MyhomeIcon.png";
import Login from "/public/image/icon/login.png";
import LoginWhite from "/public/image/icon/login-white.png";
import Logout from "/public/image/icon/logout.png";
import LogoutWhite from "/public/image/icon/logout-white.png";

import { useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { Button, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { changeLanguage } from "@/lib/redux/features/pageType/pageSlice";

const options = ["한글", "English"];

type NavProps = {
  back: string;
  mode: string;
  sign: boolean;
};

export default function NavBar({ back, mode, sign }: NavProps): JSX.Element {
  const dispatch = useAppDispatch();
  const languageMode = useAppSelector((state) => state.page.language);

  const [logoSrc, setLogoSrc] = useState(mode === "dark" ? Logo : LogoColor);
  const [signLogo, setSignLogo] = useState(
    mode === "dark" ? LoginWhite : Login
  );
  const [logOutLogo, setLogOutLogo] = useState(
    mode === "dark" ? LogoutWhite : Logout
  );
  const [lan, setLan] = useState(languageMode);

  const router = useRouter();

  const changeLan = () => {
    setLan(!languageMode);
    dispatch(changeLanguage(!languageMode));
  };
  function logOut() {
    const accessToken =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;
    if (accessToken !== null) {
      sessionStorage.removeItem("accessToken");
      router.push("/");
    }
  }

  return (
    <Navbar
      bg={back}
      expand="lg"
      sticky="top"
      variant={mode}
      className="mainNavBar"
    >
      <Container className="container">
        <Navbar.Brand>
          <Link href="/" className="nav-link">
            <Image
              src={logoSrc}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              priority={true}
              style={{ marginRight: "0.5rem" }}
            />
            MyHome
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/about" className="nav-link">
              about
            </Link>
          </Nav>
          <div className="d-flex">
            <Tooltip title={lan ? "한국어로 변경" : "Change to English"}>
              <Button color="info" onClick={changeLan}>
                {lan ? "한" : "ENG"}
              </Button>
            </Tooltip>
            {!sign && (
              <Tooltip title="LOG IN">
                <Link href="/signin">
                  <Image
                    src={signLogo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="sign in logo"
                    priority={true}
                  />
                </Link>
              </Tooltip>
            )}
            {sign && (
              <Tooltip title="LOG OUT">
                <a onClick={logOut} className="logout">
                  <Image
                    src={logOutLogo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="log out logo"
                    priority={true}
                  />
                </a>
              </Tooltip>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
      <style jsx>
        {`
          .nav-link {
            text-decoration-line: none;
            color: ${mode == "dark" ? "white" : "black"};
          }
          .container {
            color: white;
          }
          .logout {
            cursor: pointer;
          }
        `}
      </style>
    </Navbar>
  );
}
