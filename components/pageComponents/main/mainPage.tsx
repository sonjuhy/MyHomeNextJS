import CardLight from "@/components/card/LightMainCard";
import CardNotice from "@/components/card/NoticeCard";
import CardWeather from "@/components/card/WeatherCard";

import { changePage } from "@/lib/redux/features/pageType/pageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Main() {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector((state) => state.page.size);

  const onClickWeather = (page: string) => {
    dispatch(changePage(page));
  };
  return (
    <>
      <div className={pageSize < 1 ? "content" : ""}>
        <br />
        <Typography variant="overline" fontSize={32}>
          Notice
        </Typography>
        <div
          className="text-decoration-none"
          style={{
            color: "black",
          }}
        >
          <CardNotice mode="home" />
        </div>
        <Typography variant="overline" fontSize={32}>
          Weather
        </Typography>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <div
            onClick={() => {
              onClickWeather("weather");
            }}
            style={{
              cursor: "pointer",
              borderRadius: "25px",
              boxShadow:
                "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
            }}
          >
            <CardWeather />
          </div>
        </motion.div>
        <Typography variant="overline" fontSize={32}>
          Light Control
        </Typography>
        <CardLight />
        <h1></h1>
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
