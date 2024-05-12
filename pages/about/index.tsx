import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import NavBar from "@/components/navbar/NavBar";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";

import NextJSIcon from "@/public/image/icon/nextjs.png";
import JenkinsIcon from "@/public/image/icon/jenkins.png";
import GithubIcon from "@/public/image/icon/github_black.png";
import SpringBootIcon from "@/public/image/icon/springBoot.png";
import LogoIcon from "@/public/image/icon/MyHomeIcon-white.png";

import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const slideToUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToUpAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;

export default function Home() {
  const language = useAppSelector((state) => state.page.language);
  const [isVisible, setIsVisible] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [loginStatus, setLoginStatus] = useState(false);
  const logoSize = 360 - pageSize * 20;
  const fontSize = 48 - pageSize * 5;

  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // 컨테이너의 너비를 감지하여 글자 크기 동적 조절
      const containerWidth =
        document.getElementById("about-container")?.offsetWidth;

      // 예시: 너비가 200px 이하일 때 글자 크기를 14로, 그 외에는 16으로 설정
      if (containerWidth) {
        // console.log("containerWidth: " + containerWidth);
        if (containerWidth <= 576) {
          setPageSize(3);
        } else if (containerWidth <= 992) {
          setPageSize(2);
        } else if (containerWidth <= 1300) {
          setPageSize(1);
        } else {
          setPageSize(0);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    if (
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken") !== null
          ? true
          : false
        : false
    ) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current as Element);
    }
  }, [target]);

  return (
    <div id="about-container">
      <Box
        ref={target}
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <NavBar back="White" mode="light" sign={loginStatus}></NavBar>
        <TitleSection
          $isVisible={isVisible}
          style={{
            margin: "1rem",
            paddingLeft: "10rem",
            paddingRight: "10rem",
          }}
        >
          <Grid container spacing={3} direction={"row-reverse"}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box sx={{ padding: "4rem" }}>
                <Image
                  alt={"logo"}
                  src={LogoIcon}
                  width={logoSize}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box sx={{ padding: "4rem" }}>
                <Typography
                  variant="h6"
                  fontSize={fontSize}
                  sx={{ color: "#363636" }}
                >
                  {language
                    ? "Building project for only my family"
                    : "오직 가족들을 위해 빌드된 프로젝트"}
                </Typography>
                <Typography
                  fontSize={fontSize}
                  fontWeight={"bold"}
                  sx={{ color: "#eeefff", marginBottom: "2rem" }}
                >
                  MyHome Project
                </Typography>
                <Typography fontSize={20} sx={{ color: "#363636" }}>
                  {language
                    ? "It's a project that we made to use as a family. Please feel free to let me know if there are any inconveniences or additional things you would like to add."
                    : "우리 가족끼리 사용하고자 만든 프로젝트 입니다. 사용하시다 불편한 점 혹은 추가되었으면 하는 점 있으시면 언제든 말씀해주세요."}
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={6} md={3} lg={3}></Grid>
                  <Grid item xs={6} sm={6} md={3} lg={3}></Grid>
                  <Grid item xs={6} sm={6} md={3} lg={3}></Grid>
                  <Grid item xs={6} sm={6} md={3} lg={3}></Grid>
                </Grid>
                <Box sx={{ padding: "8rem" }}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Image alt={"nextjs"} src={NextJSIcon} width={40} />
                    <Image alt={"springBoot"} src={SpringBootIcon} width={40} />
                    <Image alt={"Github"} src={GithubIcon} width={40} />
                    <Image alt={"jenkins"} src={JenkinsIcon} width={30} />
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TitleSection>
      </Box>
      <style jsx global>
        {`
          body {
            background: linear-gradient(to top, #2bc0e4, #eaecc6);
          }
        `}
      </style>
    </div>
  );
}
