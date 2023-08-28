import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import sendToSpring from '@/modules/sendToSpring/sendToSpring';

function ImgOverlayExample() {
    const [weather, setWeather] = useState('맑음');
    const [wind, setWind] = useState('남풍 1.0m/s');
    const [rain, setRain] = useState('없음');
    const [temperature, setTemperature] = useState('21');
    const [time, setTime] = useState('00:00');
    const [picture, setPicture] = useState('image/img/weather/weather-sunny.jpg');

    const sunny = 'image/img/weather/weather-sunny.jpg';
    const cloudy = 'image/img/weather/weather-cloudy.jpg';
    const night = 'image/img/weather/weather-night.jpg';
    const rainy = 'image/img/weather/weather-rain.jpg';
    const snow = 'image/img/weather/weather-snow.jpg';
    const thunder = 'image/img/weather/weather-thunder.jpg';
    const windy = 'image/img/weather/weather-windy.jpg';
    

    async function getVilageFcst(){
      const bodyData={
        name: '',
        code: '',
        x_code: 91,
        y_code: 76
      }
      const response = await sendToSpring('/weather/getVilageFcst', 'POST', bodyData, '');
      // const data = await axios.request({
      //   url: process.env.BASE_URL+'/weather/getVilageFcst',
      //   method: 'POST',
      //   data:{
      //     name: '',
      //     code: '',
      //     x_code: 91,
      //     y_code: 76
      //   }
      // });
      var weatherInfos:any = response.data;
      var weatherInfo = weatherInfos[0];
      if(weatherInfo !== null && weatherInfo !== undefined) {
        setTemperature(weatherInfo.t1H);
        var pty = weatherInfo.pty;
      if(weatherInfo.lgt !== null){
        pty = '번개';
      }
      if(weatherInfo.pcp !== null){
        setRain(weatherInfo.pcp);
      }
      setWeather(pty);
      setTemperature(weatherInfo.tmp);
      setWind(weatherInfo.vec+'풍 '+weatherInfo.wsd+'m/s');

      if(pty === '비'){
        setPicture(rainy);
      }
      else if(pty === '눈/비' || pty === '눈'){
        setPicture(snow);
      }
      else if(pty === '번개'){
        setPicture(thunder);
      }
      else{
        if(weatherInfo.sky == '맑음'){
          setWeather('맑음');
          setPicture(sunny);
        }
        else if(weatherInfo.sky == '구름많음' || weatherInfo.sky == '흐림'){
          setWeather(weatherInfo.sky);
          setPicture(cloudy);
        }
        
      }
      setTime(weatherInfo.fcstTime+' 기준');
      }
      
    }

    useEffect(() => {
        getVilageFcst();
    },[])
  return (
    <Card className="bg-dark text-white shadow mb-5" style={{height: '25vh'}}>
      <Card.Img 
      src={picture} 
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
          {wind}, {temperature} °C
        </Card.Text>
        <Card.Text>
          강수량 : {rain}
        </Card.Text>
        <Card.Text>경상남도 창원시 성산구, {time}.</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default ImgOverlayExample;