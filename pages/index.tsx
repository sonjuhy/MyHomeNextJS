import Banner from "@/components/banner/Banner";
import MiddleBanner from "@/components/banner/MiddleBanner";
import BottomBanner from "@/components/banner/BottomBanner";
import Footer from "@/components/footer/Footer";
import AuthValidate from "@/modules/authValidate/authValidate";

import LogoColor from "/public/image/icon/MyhomeIcon.png";

import { ToastContainer, Toast } from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Home() {
  const [sign, setSign] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function userPermissionCheck() {
    // console.log(
    //   typeof window !== "undefined"
    //     ? sessionStorage.getItem("accessToken") !== null
    //       ? 0
    //       : 1
    //     : 2
    // );
    if (
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken") !== null
          ? true
          : false
        : false
    ) {
      console.log("before authvalidate check");
      AuthValidate()
        .then(() => {
          setSign(true);
          router.push("/main");
        })
        .catch(() => {
          setErrorMessage(
            "아직 준회원이십니다. 관리자의 승인을 받아 정회원 이후 이용가능합니다."
          );
          setErrorToast(true);
          setSign(true);
        });
    }
  }
  useEffect(() => {
    userPermissionCheck();
  }, []);
  return (
    <main>
      <Box sx={{ marginBottom: "1rem" }}>
        <Banner sign={sign}></Banner>
      </Box>
      <MiddleBanner />
      <BottomBanner />
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
      <br />
      <Footer />
      <style jsx>
        {`
          .background-main {
            background: #dfdedc;
          }
        `}
      </style>
    </main>
  );
}
