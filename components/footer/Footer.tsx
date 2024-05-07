import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

import Logo from "/public/image/icon/MyHomeIcon-white.png";

import Email from "/public/image/icon/email.png";
import Blog from "/public/image/icon/blog.png";
import GIthub from "/public/image/icon/github.png";

export default function Footer(): JSX.Element {
  return (
    <div className="footer-background d-flex align-items-center">
      <Container>
        <Row>
          <Col>
            <Image
              alt="logo"
              src={Logo}
              width={40}
              height={40}
              loading="lazy"
            />
          </Col>
          <Col>
            <p className="footer-text text-center">
              © sonjuhy. Copyright 2023. All rights reserved
            </p>
          </Col>
          <Col>
            <a href="mailto:sonjuhy@gmail.com">
              <Image
                alt="email icon"
                src={Email}
                width={40}
                height={40}
                loading="lazy"
              />
            </a>
            <a href="https://sonjuhy.tistory.com/">
              <Image
                alt="blog icon"
                src={Blog}
                width={40}
                height={40}
                loading="lazy"
              />
            </a>
            <a href="https://github.com/sonjuhy">
              <Image
                alt="github icon"
                src={GIthub}
                width={40}
                height={40}
                loading="lazy"
              />
            </a>
          </Col>
        </Row>
      </Container>
      <style jsx>
        {`
          .footer-background {
            background: #323e58;
            height: 15vh;
          }
          .footer-text {
            color: #dfdedc;
          }
        `}
      </style>
    </div>
  );
}
