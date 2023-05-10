import Banner from '@/components/banner/Banner'
import MiddleBanner from '@/components/banner/MiddleBanner'
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
          <br />
          <strong><h1>ABOUT</h1></strong>
          <h3>MyHome Project Ver 2.0</h3>
          <br />
          <Carousel />
        </Container>
        <br />
        {/* <h1 className='text-center'>WELCOME TO OUR SITE!</h1>
        <br />
        <h4 className='text-center'>This site is part of MyHome Project Ver 2.0</h4> */}
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
