import { useAppSelector } from "@/lib/redux/hooks";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import CurrentWeather from "./weatherCurrent";
import ForecastWeather from "./weatherForecast";
import React from "react";

export default function WeatherPage() {
  const pageSize = useAppSelector((state) => state.page.size);
  return (
    <>
      <div className={pageSize < 1 ? "content" : ""}>
        <Box>
          <Paper
            sx={{
              borderRadius: "25px",
              padding: "1rem",
              margin: "1rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CurrentWeather />
          </Paper>
          <Paper
            sx={{
              borderRadius: "25px",
              padding: "1rem",
              margin: "1rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <ForecastWeather />
          </Paper>
        </Box>
      </div>
      <style jsx>{`
        .content {
          margin-left: 12vw;
          padding: 1px 16px;
        }
      `}</style>
    </>
  );
}
