import Banner from '@/components/banner/Banner'
import MiddleBanner from '@/components/banner/MiddleBanner'
import Footer from '@/components/footer/Footer'
import Carousel from '@/components/carousel/Carousel'
import TopicCard from '@/components/card/TopicCard'
import AuthValidate from '@/modules/authValidate/authValidate'

import LogoColor from '/public/image/icon/MyhomeIcon.png';

import { Container, Row, Col, ToastContainer, Toast } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [sign, setSign] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  async function userPermissionCheck() {
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    if (accessToken !== null) {
      AuthValidate(accessToken)
      .then(()=>{
        setSign(true);
        // router.push('/main');
      })
      .catch(()=>{
        setErrorMessage('아직 준회원이십니다. 관리자의 승인을 받아 정회원 이후 이용가능합니다.');
        setErrorToast(true);
      });
    }
}
useEffect(() => {
  userPermissionCheck();
}, [])
return (
  <main>
    <Banner sign={sign}></Banner>
    <ToastContainer className="p-3" position={'top-start'}>
      <Toast show={errorToast} onClose={() => { setErrorToast(false) }} delay={2000} autohide={true}>
        <Toast.Header>
          <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
          <strong className="me-auto">권한 에러</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
    <div className='background-main'>
      <Container>
        <br />
        <strong><h1>ABOUT</h1></strong>
        <h3>MyHome Project Ver 2.0</h3>
        <br />
        <Carousel />
      </Container>
      <br />
      <MiddleBanner />
    </div>
    <Container>
      <h4 className='mt-5 mb-4'>CURRENT TOPICS</h4>
      <Row>
        <Col>
          <Container>
            <TopicCard title='Card 1' content='content 1' imgSrc='http://via.placeholder.com/600x300/950/ffffff' />
          </Container>
        </Col>
        <Col>
          <Container>
            <TopicCard title='Card 2' content='content 2' imgSrc='http://via.placeholder.com/600x300/950/ffffff' />
          </Container>
        </Col>
        <Col>
          <Container>
            <TopicCard title='Card 3' content='content 3' imgSrc='http://via.placeholder.com/600x300/950/ffffff' />
          </Container>
        </Col>
      </Row>
    </Container>
    <br />
    <Footer />
    <style jsx>
      {`
          .background-main {
            background: #dfdedc
          }
        `}
    </style>
  </main>
)
}
