import Link from "next/link";
import Image from "next/image";
import Logo from "/public/image/icon/MyHomeIcon-white.png";
import LogoColor from "/public/image/icon/MyhomeIcon.png";
import Login from "/public/image/icon/login.png";
import LoginWhite from "/public/image/icon/login-white.png";
import Logout from "/public/image/icon/logout.png";
import LogoutWhite from "/public/image/icon/logout-white.png";
import MenuIcon from "@mui/icons-material/Menu";

import React, { useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  changeLanguage,
  changePage,
} from "@/lib/redux/features/pageType/pageSlice";

const options = ["home", "notice", "light", "weather", "cloud", "cloudTrash"];

type NavProps = {
  category: string;
  navStatus: boolean;
  setNavStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({
  category,
  navStatus,
  setNavStatus,
}: NavProps): JSX.Element {
  const dispatch = useAppDispatch();
  const languageMode = useAppSelector((state) => state.page.language);
  const pageSize = useAppSelector((state) => state.page.size);

  const [lan, setLan] = useState(languageMode);
  const [scrollMove, setScrollMove] = useState(false);

  const router = useRouter();

  const changeLan = () => {
    setLan(!languageMode);
    dispatch(changeLanguage(!languageMode));
  };

  const selectedCategory = (selected: string) => {
    dispatch(changePage(selected));
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

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    selectedCategory(options[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollMove(true);
      } else {
        setScrollMove(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" className="mainNavBar">
      <Container className="container">
        <Navbar.Brand>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={LogoColor}
              width="35"
              height="35"
              sizes="(min-width: 320px) 100%, 100%"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              priority={true}
              style={{ marginRight: "0.5rem" }}
            />
            <Typography
              variant="overline"
              fontWeight={"bold"}
              fontSize={24}
              style={{ cursor: "default" }}
            >
              {category}
            </Typography>
          </Box>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            if (!scrollMove) {
              setNavStatus(!navStatus);
            }
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          {pageSize < 1 ? (
            <Nav className="me-auto">
              <Link
                href="/about"
                className="nav-link"
                style={{ color: "black" }}
              >
                About
              </Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <div ref={anchorRef}>
                <Button onClick={handleToggle}>
                  <MenuIcon />
                </Button>
              </div>

              <Popper
                sx={{
                  zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              <Typography variant="overline">
                                {option}
                              </Typography>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Nav>
          )}
          {/* {pageSize > 0 && (
            
          )} */}
          <div className="d-flex">
            <Tooltip title={lan ? "한국어로 변경" : "Change to English"}>
              <Button color="info" onClick={changeLan}>
                {lan ? "한" : "ENG"}
              </Button>
            </Tooltip>
            <Tooltip title="LOG OUT">
              <a onClick={logOut} className="logout">
                <Image
                  src={Logout}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="log out logo"
                  priority={true}
                />
              </a>
            </Tooltip>
          </div>
        </Navbar.Collapse>
      </Container>
      <style jsx>
        {`
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
