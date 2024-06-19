import Image from "next/legacy/image";
import Carousel from "react-bootstrap/Carousel";

import NoticeImage from "/public/image/img/carousel-notice.jpg";
import WeatherImage from "/public/image/img/carousel-weather.jpg";
import CloudImage from "/public/image/img/carousel-cloud.jpg";
import IoTImage from "/public/image/img/carousel-iot.jpg";
import { Typography } from "@mui/material";

function CarouselAboutService() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <div style={{ width: "70vw", height: "60vh" }}>
          <Image
            className="d-block w-100"
            src={IoTImage}
            alt="arduino"
            sizes="(min-width: 320px) 100%, 100%"
            objectFit="cover"
            layout="fill"
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
          <Typography variant={"overline"} fontSize={38}>
            IoT
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div style={{ width: "70vw", height: "60vh" }}>
          <Image
            className="d-block w-100"
            src={WeatherImage}
            alt="web"
            sizes="(min-width: 320px) 100%, 100%"
            objectFit="cover"
            layout="fill"
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
          <Typography variant={"overline"} fontSize={38}>
            weather
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div style={{ width: "70vw", height: "60vh" }}>
          <Image
            className="d-block w-100"
            src={NoticeImage}
            alt="android"
            sizes="(min-width: 320px) 100%, 100%"
            objectFit="cover"
            layout="fill"
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
          <Typography variant={"overline"} fontSize={38}>
            notice
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div style={{ width: "70vw", height: "60vh" }}>
          <Image
            className="d-block w-100"
            src={CloudImage}
            alt="cloud"
            sizes="(min-width: 320px) 100%, 100%"
            objectFit="cover"
            layout="fill"
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
          <Typography variant={"overline"} fontSize={38}>
            cloud
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselAboutService;
