import { useAppSelector } from "@/lib/redux/hooks";
import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import SunnyIcon from "@/public/image/icon/sunny.png";
import CloudyIcon from "@/public/image/icon/cloudy.png";
import HazyIcon from "@/public/image/icon/haze.png";
import RainyIcon from "@/public/image/icon/rainy.png";
import SnowIcon from "@/public/image/icon/snow.png";
import StormIcon from "@/public/image/icon/storm.png";
import Image from "next/image";

interface ForecastInfo {
  weather: string;
  day: string;
  time: string;
  min: number;
  max: number;
}

export default function ForecastWeather() {
  const [xCode, setXCode] = useState(91);
  const [yCode, setYCode] = useState(76);
  const [loading, setLoading] = useState(false);
  const [forecastInfoList, setForecastInfoList] = useState<ForecastInfo[]>([]);

  const pageSize = useAppSelector((state) => state.page.size);
  const language = useAppSelector((state) => state.page.language);

  const changeKorToEng = (day: string) => {
    if (day === "일") {
      return "Sun";
    } else if (day === "월") {
      return "Mon";
    } else if (day === "화") {
      return "Tue";
    } else if (day === "수") {
      return "Wen";
    } else if (day === "목") {
      return "Thu";
    } else if (day === "금") {
      return "Fri";
    } else if (day === "토") {
      return "Sat";
    }
  };

  const getForecastWeatherInfo = async () => {
    const response: any = await sendToSpring(
      `/weather/getForecastAverageInfoByCoordinate/${xCode}/${yCode}`,
      "GET",
      "",
      ""
    );
    if (response.data) {
      const tmpList: ForecastInfo[] = [];
      for (const item of response.data) {
        tmpList.push({
          weather: item.weather,
          day: item.day,
          time: item.time,
          min: item.min,
          max: item.max,
        });
      }
      setForecastInfoList(tmpList);
      setLoading(true);
    }
  };
  useEffect(() => {
    getForecastWeatherInfo();
  }, []);
  return (
    <>
      {loading ? (
        <div>
          <Typography
            variant="button"
            fontWeight={"bold"}
            fontSize={24}
            sx={{ margin: "1rem", color: "#888" }}
          >
            {language ? "Extended Forecast" : "요일별 날씨정보"}
          </Typography>
          <Stack
            direction={pageSize < 3 ? "row" : "column"}
            sx={{ justifyContent: "space-between", margin: "2rem" }}
          >
            {Array.from({ length: forecastInfoList.length }).map((_, index) => (
              <Box key={index} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={"1.5rem"}>
                    {language
                      ? changeKorToEng(forecastInfoList[index].day)
                      : forecastInfoList[index].day}
                  </Typography>
                  <Image
                    alt="weatherIcon"
                    src={
                      forecastInfoList[index].weather === "Clear"
                        ? SunnyIcon
                        : forecastInfoList[index].weather === "Cloud"
                        ? CloudyIcon
                        : forecastInfoList[index].weather === "Rain"
                        ? RainyIcon
                        : forecastInfoList[index].weather === "Drizzle"
                        ? RainyIcon
                        : forecastInfoList[index].weather === "Thunderstorm"
                        ? StormIcon
                        : forecastInfoList[index].weather === "Snow"
                        ? SnowIcon
                        : forecastInfoList[index].weather === "Atmosphere"
                        ? HazyIcon
                        : SunnyIcon
                    }
                  />
                  <Typography fontSize={"1.5rem"} sx={{ color: "#4a6fa1" }}>
                    {forecastInfoList[index].weather}
                  </Typography>
                  <Typography
                    fontSize={"1rem"}
                    fontWeight={"bold"}
                    sx={{ color: "#4a6fa1" }}
                  >
                    {forecastInfoList[index].max.toFixed()}º /{" "}
                    {forecastInfoList[index].min.toFixed()}º
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </div>
      ) : (
        <div>
          <Typography
            variant="button"
            fontWeight={"bold"}
            fontSize={24}
            sx={{ margin: "1rem", color: "#888" }}
          >
            {language ? "Extended Forecast" : "요일별 날씨정보"}
          </Typography>
          <Stack
            direction={pageSize < 3 ? "row" : "column"}
            sx={{ justifyContent: "space-between", margin: "2rem" }}
          >
            {Array.from({ length: forecastInfoList.length }).map((_, index) => (
              <Box key={index} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <Stack
                  sx={{
                    width: "12vw",
                  }}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                  <Skeleton
                    variant="rounded"
                    sx={{ width: "10rem", height: "3rem" }}
                  />
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Stack>
              </Box>
            ))}
          </Stack>
        </div>
      )}
    </>
  );
}
