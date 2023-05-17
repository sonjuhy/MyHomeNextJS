import Sunny from '/public/image/img/weather/weather-sunny.jpg';
import Cloudy from '/public/image/img/weather/weather-cloudy.jpg';
import Night from '/public/image/img/weather/weather-night.jpg';
import Rainy from '/public/image/img/weather/weather-rain.jpg';
import Snow from '/public/image/img/weather/weather-snow.jpg';
import Thunder from '/public/image/img/weather/weather-thunder.jpg';
import Windy from '/public/image/img/weather/weather-windy.jpg';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';

function ImgOverlayExample() {
    const [weather, setWeather] = useState('');
    const [status, setStatus] = useState('');
    const [temperature, setTemperature] = useState('');
    const [picture, setPicture] = useState('/public/image/img/weather/weather-sunny.jpg');

    const sunny = 'image/img/weather/weather-sunny.jpg';
    const cloudy = 'image/img/weather/weather-cloudy.jpg';
    const night = 'image/img/weather/weather-night.jpg';
    const rainy = 'image/img/weather/weather-rain.jpg';
    const snow = 'image/img/weather/weather-snow.jpg';
    const thunder = 'image/img/weather/weather-thunder.jpg';
    const windy = 'image/img/weather/weather-windy.jpg';

    useEffect(() => {
        setWeather('맑음');
        setStatus('화창한 날씨');
        setTemperature('10');
        setPicture('Sunny');
    },[])
    
  return (
    <Card className="bg-dark text-white shadow mb-5" style={{height: '25vh'}}>
      <Card.Img 
      src={night} 
      className="img-fluid" 
      style={{
        height: '25vh',
        objectFit: 'cover',
        opacity: '0.6'
    }} 
      alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{weather}</Card.Title>
        <br/>
        <Card.Text>
          {status}
        </Card.Text>
        <Card.Text>
          {temperature} °C
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default ImgOverlayExample;