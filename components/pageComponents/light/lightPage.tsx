import LightSelector from "./lightSelector";
import LightStatus from "./lightStatus";
import LightReserve from "./lightReserve";
import { useEffect, useState } from "react";
import Image from 'next/image';

import {Button, Stack, Row, Col, Container, Tabs, Tab, ToastContainer, Toast} from 'react-bootstrap';

import LogoColor from '/public/image/icon/MyhomeIcon.png';
import sendToSpring from "@/modules/sendToSpring/sendToSpring";

interface roomInfo{
    room: string;
    state: string;
    kor: string;
    category: string;
    connect: string;
}

export default function Main() {
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [room, setRoom] = useState<roomInfo>({
        room: 'empty',
        state: 'Off',
        kor: '선택하세요.',
        category: '',
        connect: 'Off',
    });
    
    const setRoomInfo = (newRoom:roomInfo) => {
        setRoom(newRoom);
    };

    // useEffect(() => {
    //     console.log(room);
    // },[room]);
    return (
        <>
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={errorToast} onClose={() => { setErrorToast(false) }} delay={3000} autohide={true}>
                    <Toast.Header>
                        <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
                        <strong className="me-auto">권한 에러</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className='content'>
                <br/>
                <h1>Light</h1>
                <br/>
                <LightSelector setRoom={setRoomInfo}/>
                <br/>
                <LightStatus roomData={room}/>
                <br/>
                <LightReserve room={room.room}/>
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
