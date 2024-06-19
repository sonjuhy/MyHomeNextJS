import Image from "next/legacy/image";
import { useRouter } from "next/router";

import NavBar from "@/components/navbar/NavBar";

import InputIcon from "@mui/icons-material/Input";
import LaunchIcon from "@mui/icons-material/Launch";

import BannerImage from "/public/image/img/main_banner.jpg";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/redux/hooks";

type propsBanner = {
  sign: boolean;
};
export default function Banner({ sign }: propsBanner) {
  const router = useRouter();
  const languageMode = useAppSelector((state) => state.page.language);

  return (
    <div className="banner-background">
      {/* <NavBar back="Transition" mode="light" sign={sign}></NavBar> */}
      <NavBar back="White" mode="light" sign={sign}></NavBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "4rem",
          minHeight: "90vh",
        }}
      >
        <Grid
          container
          direction={"row-reverse"}
          style={{
            width: "80%",
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={{}}>
              <Image alt="main_banner" src={BannerImage} objectFit="cover" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Typography fontWeight={"bold"} fontSize={48}>
                {languageMode ? "Enjoy" : "홈페이지로"}
              </Typography>
              <Typography
                fontWeight={"bold"}
                fontSize={"3rem"}
                style={{ color: "#3ebbc4" }}
              >
                {languageMode ? "MyHome Service" : "MyHome 서비스를"}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={48}>
                {languageMode ? "With Web" : "즐겨보세요."}
              </Typography>
            </Box>
            <Typography
              fontSize={24}
              sx={{ color: "#888" }}
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              {languageMode
                ? "Try the existing MyHome service on the website"
                : "홈페이지로 MyHome 서비스를 사용해보세요."}
            </Typography>
            <Button
              variant="contained"
              color="info"
              onClick={() => router.push("/signin")}
            >
              {languageMode ? "LOGIN" : "로그인"}

              <InputIcon style={{ marginLeft: "0.5rem" }} />
            </Button>

            <Box sx={{ marginTop: "2rem" }}>
              <Divider variant="middle">
                <Chip label="SIGN UP" />
              </Divider>
              <br />
              <Typography
                fontSize={20}
                style={{ marginBottom: "0.5rem", color: "#888" }}
              >
                {languageMode
                  ? "Aren't you a member? Try it after signing up for membership"
                  : "회원이 아니신가요? 회원가입 후 서비스를 이용해주세요."}
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/signup")}
                style={{ backgroundColor: "#121212" }}
              >
                {languageMode ? "SIGN UP" : "회원가입"}

                <LaunchIcon style={{ marginLeft: "0.5rem" }} />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <style jsx>{`
        .banner-background {
          position: relative;
          height: 100%;
        }
        .container-main {
          top: 40vh;
          z-index: 1;
          position: absolute;
        }
        .button-main {
          margin: 5vw;
        }
        .text-main {
          color: white;
        }
      `}</style>
    </div>
  );
}
