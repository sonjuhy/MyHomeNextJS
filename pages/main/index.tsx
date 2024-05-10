import AuthValidate from "@/modules/authValidate/authValidate";
import NavBar from "@/components/navbar/MainNavBar";
import styles from "./index.module.css";
import MainPage from "@/components/pageComponents/main/mainPage";
import NoticePage from "@/components/pageComponents/notice/noticePage";
import LightPage from "@/components/pageComponents/light/lightPage";
import CloudPage from "@/components/pageComponents/cloud/cloudPage";
import CloudTrashPage from "@/components/pageComponents/cloud/cloudTrashPage";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import LogoColor from "/public/image/icon/MyhomeIcon.png";
import LogoWhite from "/public/image/icon/MyHomeIcon-white.png";
import UserIcon from "/public/image/icon/user-white.png";
import SettingIcon from "/public/image/icon/setting-white.png";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import Link from "next/link";

import {
  changePage,
  changePageSize,
} from "@/lib/redux/features/pageType/pageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

import { motion, AnimatePresence } from "framer-motion";
import { Box, Divider, Stack, Typography } from "@mui/material";

interface User {
  userId: number;
  id: string;
  name: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  auth: string;
}

export default function Main() {
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const category = useAppSelector((state) => state.page.value);
  const userName = useAppSelector((state) => state.auth.name);
  const pageSize = useAppSelector((state) => state.page.size);

  const [cloudSpecifiedCategory, setCloudSpecifiedCategory] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [navOverlay, setNavOverlay] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const theme = "dark";

  const specifiedCategory = () => {
    setCloudSpecifiedCategory(!cloudSpecifiedCategory);
  };

  function selectedCategory(selected: string) {
    dispatch(changePage(selected));
    if (!selected.includes("cloud")) {
      setCloudSpecifiedCategory(false);
    }
  }

  async function userPermissionCheck() {
    if (accessToken !== null) {
      AuthValidate()
        .then(() => {
          setVisible(true);
        })
        .catch(() => {
          setErrorMessage("접근권한이 없습니다. 관리자에게 문의 바랍니다.");
          setErrorToast(true);
          router.push("/", undefined, { shallow: true });
        });
    } else {
      setErrorMessage("로그인 이후 이용가능합니다.");
      setErrorToast(true);
      router.push("/", undefined, { shallow: true });
    }
  }

  useEffect(() => {
    userPermissionCheck();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // 컨테이너의 너비를 감지하여 글자 크기 동적 조절
      const containerWidth =
        document.getElementById("main-container")?.offsetWidth;

      // 예시: 너비가 200px 이하일 때 글자 크기를 14로, 그 외에는 16으로 설정
      if (containerWidth) {
        // console.log("containerWidth: " + containerWidth);
        if (containerWidth <= 576) {
          dispatch(changePageSize(3));
        } else if (containerWidth <= 992) {
          dispatch(changePageSize(2));
        } else if (containerWidth <= 1300) {
          dispatch(changePageSize(1));
        } else {
          dispatch(changePageSize(0));
        }
      }
    };
    const onScroll = () => {
      const navComponent = document.getElementById("main-nav");
      const contentComponent = document.getElementById("content-component");
      if (navComponent && contentComponent) {
        const navRect = navComponent.getBoundingClientRect();
        const contentRect = contentComponent.getBoundingClientRect();
        if (
          navRect.bottom >= contentRect.top &&
          navRect.top <= contentRect.bottom
        ) {
          setNavOverlay(true);
        } else {
          setNavOverlay(false);
        }
      }
    };
    // 초기 로드 시와 창 크기 변경 시에 이벤트 리스너 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    onScroll();
    window.addEventListener("scroll", onScroll);

    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      id="main-container"
      style={{
        backgroundColor: "#EEEEEE",
        paddingBottom: "4rem",
      }}
    >
      <ToastContainer className="p-3" position={"top-start"}>
        <Toast
          show={errorToast}
          onClose={() => {
            setErrorToast(false);
          }}
          delay={4000}
          autohide={true}
        >
          <Toast.Header>
            <Image
              alt="logo"
              src={LogoColor}
              className="rounded me-2"
              width={20}
              height={20}
            />
            <strong className="me-auto">권한 에러</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div>
        {visible && (
          <div>
            {/* side bar */}
            <Box>
              {pageSize < 1 ? (
                <div
                  className={`${styles.sidebar} text-center`}
                  style={{ margin: "0.5rem" }}
                >
                  <div>
                    <Box
                      sx={{
                        marginTop: "2rem",
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        alt="userIcon"
                        src={LogoWhite}
                        className="rounded me-2"
                        width={40}
                        height={40}
                        priority={true}
                      />
                      <Typography sx={{ color: "whitesmoke" }}>
                        MyHome
                      </Typography>
                    </Box>

                    <Divider
                      sx={{ margin: "0.5rem", backgroundColor: "white" }}
                    />
                    <Image
                      alt="userIcon"
                      src={UserIcon}
                      className="rounded me-2"
                      width={60}
                      height={60}
                      priority={true}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ color: "white" }}>
                        {`${userName}`} 님
                      </Typography>
                      <Image
                        alt="settingIcon"
                        src={SettingIcon}
                        width={30}
                        height={30}
                        onClick={() => {
                          router.push("/setting");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </Box>
                  </div>
                  <Divider
                    sx={{ margin: "0.5rem", backgroundColor: "white" }}
                  />
                  <Box sx={{ textAlign: "left", padding: "0.5rem" }}>
                    <Typography variant="overline" sx={{ color: "whitesmoke" }}>
                      Menu
                    </Typography>
                    <div
                      className={
                        category === "home"
                          ? `${styles.selectedMenu}`
                          : `${styles.sidebarMenu}`
                      }
                      onClick={() => {
                        selectedCategory("home");
                      }}
                    >
                      Home
                    </div>
                    <div
                      className={
                        category === "light"
                          ? `${styles.selectedMenu}`
                          : `${styles.sidebarMenu}`
                      }
                      onClick={() => {
                        selectedCategory("light");
                      }}
                    >
                      Light
                    </div>
                    <div
                      className={
                        category === "weather"
                          ? `${styles.selectedMenu}`
                          : `${styles.sidebarMenu}`
                      }
                      onClick={() => {
                        selectedCategory("weather");
                      }}
                    >
                      Weather
                    </div>
                    <div
                      className={
                        cloudSpecifiedCategory
                          ? `${styles.selectedSubMenu}`
                          : `${styles.sidebarMenu}`
                      }
                      onClick={() => {
                        specifiedCategory();
                      }}
                    >
                      {cloudSpecifiedCategory ? (
                        <Typography>
                          Cloud
                          <KeyboardArrowDownIcon />
                        </Typography>
                      ) : (
                        <Typography>
                          Cloud
                          <KeyboardArrowUpIcon />
                        </Typography>
                      )}
                    </div>
                    {cloudSpecifiedCategory && (
                      <Box>
                        <div
                          className={
                            category === "cloud"
                              ? `${styles.selectedMenu}`
                              : `${styles.sidebarMenu}`
                          }
                          onClick={() => {
                            selectedCategory("cloud");
                          }}
                        >
                          Cloud
                        </div>
                        <div
                          className={
                            category === "cloudTrash"
                              ? `${styles.selectedMenu}`
                              : `${styles.sidebarMenu}`
                          }
                          onClick={() => {
                            selectedCategory("cloudTrash");
                          }}
                        >
                          Cloud Trash
                        </div>
                      </Box>
                    )}
                  </Box>
                </div>
              ) : (
                <Box></Box>
              )}
            </Box>
            {/* nav bar */}
            <div
              style={{
                marginLeft: pageSize < 1 ? "12vw" : "0vw",
                padding: "1px 16px",
              }}
            >
              <div
                id="main-nav"
                className={`${
                  navOverlay ? styles.mainNavOverlay : styles.mainNav
                }`}
              >
                <NavBar
                  category={category}
                  navStatus={navOverlay}
                  setNavStatus={setNavOverlay}
                />
              </div>
            </div>
            <div id="content-component" style={{ marginTop: "7.5rem" }}>
              <div style={{ margin: "1rem" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={category}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category === "home" ? (
                      <MainPage />
                    ) : category === "light" ? (
                      <LightPage />
                    ) : category === "weather" ? (
                      <div>Weather</div>
                    ) : category === "cloud" ? (
                      <CloudPage />
                    ) : category === "cloudTrash" ? (
                      <CloudTrashPage />
                    ) : category === "notice" ? (
                      <NoticePage />
                    ) : (
                      <div></div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
