import Image from "next/image";

import BannerImage from "/public/image/img/middle-banner.jpg";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import WebImage from "/public/image/img/web.jpg";
import AndroidImage from "/public/image/img/mobile.jpg";

import Carousel from "../carousel/Carousel";
import { useAppSelector } from "@/lib/redux/hooks";

const imageStyle = {
  filter: "brightness(0.5)",
};

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
const slideToDownAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0%);
  }
  to {
    opacity: 0;
    transform: translateY(-5%);
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
      : css`
          ${slideToDownAnimation} 1s ease-in-out forwards
        `};
`;

const MiddleBanner = () => {
  const languageMode = useAppSelector((state) => state.page.language);

  const featureTarget = useRef<HTMLDivElement>(null);
  const androidTarget = useRef<HTMLDivElement>(null);
  const webTarget = useRef<HTMLDivElement>(null);

  const [isFeatureVisible, setIsFeatureVisible] = useState(false);
  const [isAndroidVisible, setIsAndroidVisible] = useState(false);
  const [isWebVisible, setIsWebVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (featureTarget) {
      observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setIsFeatureVisible(true);
          } else {
            setIsFeatureVisible(false);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(featureTarget.current as Element);
    }
  }, [featureTarget]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (androidTarget) {
      observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setIsAndroidVisible(true);
          } else {
            setIsAndroidVisible(false);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(androidTarget.current as Element);
    }
  }, [androidTarget]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (webTarget) {
      observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setIsWebVisible(true);
          } else {
            setIsWebVisible(false);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(webTarget.current as Element);
    }
  }, [webTarget]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
        }}
      >
        <TitleSection $isVisible={isFeatureVisible}>
          <Box ref={featureTarget} sx={{ marginBottom: "10vh" }}>
            <Typography
              variant="overline"
              fontSize={18}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              About Service
            </Typography>
            <Grid container direction={"row-reverse"}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card
                  style={{
                    width: "35vw",
                    height: "60vh",
                    overflow: "hidden",
                    borderRadius: "25px",
                  }}
                >
                  <Carousel />
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box sx={{ width: "80%" }}>
                  <Typography
                    fontSize={32}
                    fontWeight={"bold"}
                    sx={{ marginBottom: "1rem" }}
                  >
                    {languageMode
                      ? "What is MyHome Service?"
                      : "MyHome 서비스란?"}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "MyHome services provide"
                      : "MyHome 서비스는 아래의 기능들을 제공합니다."}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "IoT, Cloud, Weather, and Announcement services."
                      : "IoT, 클라우드, 날씨 그리고 공지."}
                  </Typography>
                  <br />
                  <Typography fontSize={20} sx={{ marginBottom: "0.5rem" }}>
                    {languageMode
                      ? "It provides various functions such as controlling IoT devices present at home, sharing files through the cloud, and checking weather information from the Korea Meteorological Administration."
                      : "집에 있는 IoT 기기들을 제어하고, 클라우드 서비스를 통해 파일을 공유하며, 기상청으로부터 날씨 정보를 제공합니다."}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "The service delivery method supports web and android methods."
                      : "해당 서비스들은 안드로이드에서도 동일하게 제공됩니다."}
                  </Typography>
                  <br />
                  <Typography fontSize={16} sx={{ color: "#888" }}>
                    {languageMode
                      ? "▪ This service is only available to members."
                      : "▪ 해당 서비스는 회원만 사용 가능합니다."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TitleSection>

        <TitleSection $isVisible={isWebVisible}>
          <Box ref={webTarget} sx={{ marginBottom: "20vh" }}>
            <Typography
              variant="overline"
              fontSize={18}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              About Web
            </Typography>
            <Grid container direction={"row-reverse"}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card
                  style={{
                    width: "35vw",
                    height: "30rem",
                    overflow: "hidden",
                    position: "absolute",
                    borderRadius: "25px",
                  }}
                >
                  <Image
                    alt="main_banner"
                    src={WebImage}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box sx={{ width: "80%" }}>
                  <Typography
                    fontSize={32}
                    fontWeight={"bold"}
                    sx={{ marginBottom: "1rem" }}
                  >
                    {languageMode
                      ? "What services do the Web offer?"
                      : "홈페이지에서 어떤 서비스가 제공되나요?"}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "MyHome Web Service provide"
                      : " MyHome Web 서비스에서는 아래의 기능들을 제공합니다."}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "IoT, Cloud, Weather, and Announcement services."
                      : "IoT, 클라우드, 날씨 그리고 공지."}
                  </Typography>
                  <br />
                  <Typography fontSize={20} sx={{ marginBottom: "0.5rem" }}>
                    {languageMode
                      ? "You can use all of the services you provide by default. Cloud-focused services specialize in controlling files and uploading new files that exist in the cloud."
                      : "기본적으로 제공하는 서비스와 동일하게 사용할 수 있습니다. 웹 서비스는 클라우드 특화 서비스로 클라우드에 존재하는 파일 제어 및 새 파일 업로드 등에 특화되어있습니다."}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "The services provided by the web are also available on mobile."
                      : "모바일에서도 웹에서의 동일한 서비스를 제공합니다."}
                  </Typography>
                  <br />
                  <Typography fontSize={16} sx={{ color: "#888" }}>
                    {languageMode
                      ? "▪ This service is only available to members."
                      : "▪ 해당 서비스는 회원만 사용 가능합니다."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TitleSection>

        <TitleSection $isVisible={isAndroidVisible}>
          <Box ref={androidTarget} sx={{ marginBottom: "20vh" }}>
            <Typography
              variant="overline"
              fontSize={18}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              About Android
            </Typography>
            <Grid container direction={"row-reverse"}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <Card
                    style={{
                      width: "35vw",
                      height: "30rem",
                      overflow: "hidden",
                      position: "absolute",
                      borderRadius: "25px",
                    }}
                  >
                    <Image
                      alt="main_banner"
                      src={AndroidImage}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box sx={{ width: "80%" }}>
                  <Typography
                    fontSize={32}
                    fontWeight={"bold"}
                    sx={{ marginBottom: "1rem" }}
                  >
                    {languageMode
                      ? "What services do the Android offer?"
                      : "안드로이드에서 어떤 서비스가 제공되나요?"}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "MyHome Android Service provide"
                      : " MyHome Android 서비스에서는 아래의 기능들을 제공합니다."}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "IoT, Cloud, Weather, and Announcement services."
                      : "IoT, 클라우드, 날씨 그리고 공지."}
                  </Typography>
                  <br />
                  <Typography fontSize={20} sx={{ marginBottom: "0.5rem" }}>
                    {languageMode
                      ? "You can use all of the services you provide by default. It is a service specialized in IoT services. In addition to real-time feedback on IoT control, detailed information and control such as reservation setting and status can be made."
                      : "기본적으로 제공하는 서비스와 동일하게 사용할 수 있습니다. IoT 서비스에 특화되어있는 서비스 입니다. 실시간 IoT 제어 및 상황 확인 뿐만 아니라 기기의 예약 설정, 세부 정보 확인 등 가능합니다."}
                  </Typography>
                  <Typography fontSize={20}>
                    {languageMode
                      ? "The services provided by the mobile are also available on web."
                      : "웹에서도 모바일에서의 동일한 서비스를 제공합니다."}
                  </Typography>
                  <br />
                  <Typography fontSize={16} sx={{ color: "#888" }}>
                    {languageMode
                      ? "▪ This service is only available to members."
                      : "▪ 해당 서비스는 회원만 사용 가능합니다."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TitleSection>
      </Box>
    </Box>
  );
};

export default MiddleBanner;
