import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import StormIcon from "@mui/icons-material/Storm";
import { useAppSelector } from "@/lib/redux/hooks";

interface CurrentWeatherInfo {
  weather: string;
  temperature: number;
  feelTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export default function CurrentWeather() {
  const weatherIconDefaultLink = "https://openweathermap.org/img/wn/";
  const [loading, setLoading] = useState(false);
  const [xCode, setXCode] = useState(91);
  const [yCode, setYCode] = useState(76);
  const [cityName, setCityName] = useState("changwon");
  const [weatherInfo, setWeatherInfo] = useState<CurrentWeatherInfo>();
  const [iconId, setIconId] = useState("");

  const language = useAppSelector((state) => state.page.language);

  const getCurrentWeatherInfo = async () => {
    const response: any = await sendToSpring(
      `/weather/getCurrentInfoByCoordinate/${xCode}/${yCode}`,
      "GET",
      "",
      ""
    );
    if (response.result === 200 && response.data) {
      const tmpData: any = response.data;
      let tmpWeatherInfo: CurrentWeatherInfo = {
        weather: tmpData.weather[0].main,
        temperature: tmpData.main.temp,
        feelTemperature: tmpData.main.feels_like,
        minTemperature: tmpData.main.temp_min,
        maxTemperature: tmpData.main.temp_max,
        humidity: tmpData.main.humidity,
        windSpeed: tmpData.wind.speed,
        pressure: tmpData.main.pressure,
      };
      setIconId(weatherIconDefaultLink + tmpData.weather[0].icon + "@4x.png");
      setWeatherInfo(tmpWeatherInfo);
      setLoading(true);
    }
  };
  useEffect(() => {
    getCurrentWeatherInfo();
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <>
            <Typography
              variant="button"
              fontWeight={"bold"}
              fontSize={24}
              sx={{ margin: "1rem", color: "#888" }}
            >
              {language ? "Current Weather" : "현재 날씨"}
            </Typography>
            <Grid container sx={{ margin: "1rem" }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="button"
                      fontWeight={"bold"}
                      fontSize={"2rem"}
                      sx={{ color: "#666" }}
                    >
                      {cityName}
                    </Typography>
                    <Stack
                      direction={"row"}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        alt="weatherIcon"
                        src={iconId}
                        width={"250rem"}
                        height={"250rem"}
                      />
                      <Typography fontSize={"5rem"}>
                        {weatherInfo?.temperature}º
                      </Typography>
                    </Stack>
                    <Typography fontSize={"2rem"} sx={{ color: "#999" }}>
                      {weatherInfo?.weather}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography
                  sx={{ color: "#4a6fa1" }}
                  fontWeight={"bold"}
                  fontSize={"2rem"}
                >
                  {language ? "Feels like" : "체감 온도"}{" "}
                  {weatherInfo?.feelTemperature}º
                </Typography>
                <Stack direction={"row"} sx={{ marginBottom: "2rem" }}>
                  <Typography fontSize={"1.5rem"} variant="overline">
                    <ArrowDropUpIcon sx={{ marginRight: "1rem" }} />
                    {weatherInfo?.maxTemperature}º
                    <ArrowDropDownIcon
                      sx={{ marginLeft: "1rem", marginRight: "1rem" }}
                    />
                    {weatherInfo?.minTemperature}º
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={3}>
                  <Stack spacing={2}>
                    <Typography sx={{ color: "#7b98b2" }} fontSize={"1.5rem"}>
                      <WaterDropIcon sx={{ marginRight: "1rem" }} />
                      {language ? "Humidity" : "습도"}
                    </Typography>
                    <Typography sx={{ color: "#7b98b2" }} fontSize={"1.5rem"}>
                      <AirIcon sx={{ marginRight: "1rem" }} />
                      {language ? "Wind" : "풍속"}
                    </Typography>
                    <Typography sx={{ color: "#7b98b2" }} fontSize={"1.5rem"}>
                      <StormIcon sx={{ marginRight: "1rem" }} />
                      {language ? "Pressure" : "기압"}
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    <Typography sx={{ color: "#3080c8" }} fontSize={"1.5rem"}>
                      {weatherInfo?.humidity}%
                    </Typography>
                    <Typography sx={{ color: "#3080c8" }} fontSize={"1.5rem"}>
                      {weatherInfo?.windSpeed}kph
                    </Typography>
                    <Typography sx={{ color: "#3080c8" }} fontSize={"1.5rem"}>
                      {weatherInfo?.pressure}hPa
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container sx={{ margin: "1rem" }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ width: "80%" }}>
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    <Stack
                      direction={"row"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "80%",
                      }}
                    >
                      <Skeleton variant="rounded" sx={{ fontSize: "5rem" }} />
                    </Stack>
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Stack sx={{ marginBottom: "2rem", width: "80%" }}>
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Stack>
                <Stack direction={"row"} spacing={3} sx={{ width: "80%" }}>
                  <Stack spacing={2} sx={{ width: "100%" }}>
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                  </Stack>
                  <Stack spacing={2} sx={{ width: "100%" }}>
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </>
  );
}
