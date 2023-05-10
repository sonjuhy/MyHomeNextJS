import Image from "next/image";
import {Container, Row, Col} from "react-bootstrap";

import BannerImage from '/public/image/img/middle-banner.jpg';

const Home = () => {
    return <div className='banner-background'>
        <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center container-main">
                <Container fluid>
                <Row >
                    <Col>
                        <h1 className="text-main text-center">Middle Banner Title</h1>
                        <h3 className="text-main text-center">Middle Banner Sub Title</h3>
                    </Col>
                    <Col>
                        <h1 className="text-main text-center">Middle Banner Content</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        </div>
        <Image
          src={BannerImage}
          alt="메인 배경 이미지"
          loading="lazy"
          placeholder="blur"
          fill
          style={imageStyle}
          objectFit="cover"
          objectPosition="center"
        />
        <style jsx>{`
            .banner-background {
                position: relative;
                min-height: 100vh;
            }
            .container-main{
                top: 40vh;
                z-index: 1;
                position: absolute;
                width: 80vw
            }
            .button-main {
                margin:5vw;
            }
            .text-main {
                color: white;
            }
        `}</style>
    </div>
}

const imageStyle = {
    filter : 'brightness(0.5)'
};

export default Home;