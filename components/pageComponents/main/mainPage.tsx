import CardLight from "@/components/card/LightMainCard";
import CardNotice from "@/components/card/NoticeCard";
import CardWeather from '@/components/card/WeatherCard';

import { reset, pageChanger, changePage } from '@/lib/features/pageType/pageSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

type props = {
    selectMenu: (value: string) => void;
}
    export default function Main() {
        const dispatch = useAppDispatch();
        const onClickWeather = (page:string) =>{
            dispatch(changePage(page));
        };
    return (
        <>
            <div className='content'>
                <br/>
                <h1>Notice</h1>
                <div className='text-decoration-none' style={{color:'black', cursor:'pointer'}} onClick={() =>{onClickWeather('notice')}}>
                    <CardNotice/>
                </div>
                <h1>Weather</h1>
                <div onClick={() =>{onClickWeather('weather')}} style={{cursor:'pointer'}}>
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