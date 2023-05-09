import Image from 'next/image'

import Banner from '@/components/banner/Banner'
import BannerImage from '/public/image/img/banner.jpg'
import Footer from '@/components/footer/Footer'
import Carousel from '@/components/carousel/Carousel'
import TopicCard from '@/components/card/TopicCard'

import { Container, Stack, Row, Col } from 'react-bootstrap'

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <div className='background-main'>
        <Container>
          <br/>
          <h1 className='text-center'>ABOUT THIS SITE</h1>
          <br/>
          <Carousel/>
        </Container>
        <br/>
        <h1 className='text-center'>WELCOME TO OUR SITE!</h1>
        <br/>
        <h4 className='text-center'>This site is part of MyHome Project Ver 2.0</h4>
        <br/>
        <Image
          src={BannerImage}
          alt="main page banner image"
          width={0}
          height={0}
          loading="lazy"
          layout="responsive"
        />
      </div>
      <Container>
        <h4 className='mt-5 mb-4'>CURRENT TOPICS</h4>
        <Row>
          <Col>
          <TopicCard title='Card 1' content='content 1' imgSrc='http://via.placeholder.com/600x300/950/ffffff'/>
          </Col>
          <Col>
          <TopicCard title='Card 2' content='content 2' imgSrc='http://via.placeholder.com/600x300/950/ffffff'/>
          </Col>
          <Col>
          <TopicCard title='Card 3' content='content 3' imgSrc='http://via.placeholder.com/600x300/950/ffffff'/>
          </Col>
        </Row>
      </Container>
      <br/>
      <Footer/>
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
