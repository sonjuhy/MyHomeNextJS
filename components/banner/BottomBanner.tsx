import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import LaunchIcon from "@mui/icons-material/Launch";
import { useAppSelector } from "@/lib/redux/hooks";

const BottomBanner = () => {
  const languageMode = useAppSelector((state) => state.page.language);
  const router = useRouter();
  return (
    <Box sx={{ margin: "3rem" }}>
      <Divider
        style={{
          marginTop: "3rem",
          marginBottom: "3rem",
          backgroundColor: "black",
        }}
        variant="middle"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="overline" fontSize={20}>
            get started
          </Typography>
          <Typography variant="h4" sx={{ margin: "1rem" }}>
            {languageMode
              ? "Get started with MyHome Now"
              : "지금 바로 시작해보세요."}
          </Typography>
          <Typography variant="h6" sx={{ margin: "1rem", color: "#666" }}>
            {languageMode
              ? "Make life more convenient, more valuable."
              : "삶을 보다 편리하게, 보다 가치있게"}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.push("/signup")}
            sx={{ color: "#111" }}
          >
            {languageMode ? "SIGN UP" : "회원가입"}
            <LaunchIcon style={{ marginLeft: "0.5rem" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default BottomBanner;
