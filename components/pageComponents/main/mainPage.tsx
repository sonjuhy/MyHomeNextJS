import CardLight from "@/components/card/LightMainCard";
import CardNotice from "@/components/card/NoticeCard";
import CardWeather from '@/components/card/WeatherCard';

type props = {
    selectMenu: (value: string) => void;
}
export default function Main({selectMenu}:props) {

    return (
        <>
            <div className='content'>
                <br/>
                <h1>Notice</h1>
                <div className='text-decoration-none' style={{color:'black'}} onClick={() =>{selectMenu('notice')}}>
                    <CardNotice/>
                </div>
                <h1>Weather</h1>
                <div onClick={() =>{selectMenu('weather')}}>
                    <CardWeather/>
                </div>
                <h1>Light Control</h1>
                    <CardLight/>
                <h1></h1>
            </div>
            <style jsx>{`
            .content {
                margin-left: 12vw;
                padding: 1px 16px;
            }
            `}</style>
        </>
    )
}