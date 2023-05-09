import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';

import AndroidImage from '/public/image/img/carousel-mobile.jpg';
import WebImage from '/public/image/img/carousel-web.jpg';
import CloudImage from '/public/image/img/carousel-cloud.jpg';
import IoTImage from '/public/image/img/carousel-iot.jpg';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <div style={{ width: '70vw', height: '60vh' }}>
          <Image
            className="d-block w-100"
            src={IoTImage}
            alt="arduino"
            fill
            sizes='(max-width: 300px)80vw, (max-width: 600px)65vw'
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
          <h1>IoT</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div style={{ width: '70vw', height: '60vh' }}>
          <Image
            className="d-block w-100"
            src={WebImage}
            alt="web"
            fill
            sizes='(max-width: 300px)80vw, (max-width: 600px)65vw'
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
        <h1>Web</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div style={{ width: '70vw', height: '60vh' }}>
          <Image
            className="d-block w-100"
            src={AndroidImage}
            alt="android"
            fill
            sizes='(max-width: 300px)80vw, (max-width: 600px)65vw'
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
        <h1>Android</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div style={{ width: '70vw', height: '60vh' }}>
          <Image
            className="d-block w-100"
            src={CloudImage}
            alt="cloud"
            fill
            sizes='(max-width: 300px)80vw, (max-width: 600px)65vw'
            quality={90}
            loading="lazy"
          />
        </div>
        <Carousel.Caption>
        <h1>Cloud</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;