import sendToSpring from "@/modules/sendToSpring/sendToSpring";

import LightReserveModal from './lightReserveModal';

import { useEffect, useState } from "react";
import Image from 'next/image';

import {Card, Col, Container, Form, Row, Stack} from 'react-bootstrap';

import AddIcon from '/public/image/icon/add.png';
import NoDataIcon from '/public/image/icon/nofile.png';
import ErrorIcon from "/public/image/icon/error.png";

type props = {
    room: string;
}

export default function lightSelector({room}:props):JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [reservationStatus, setReservationStatus] = useState(false);
    const [reservationList, setReservationList] = useState([]);

    const addButtonListener = () => {
        setModalVisible(!modalVisible);
    }
    const getReserveList = async () => {
        const response = await sendToSpring('/light/getReserveAll', 'GET', '','');
        if(response.result === 200){
            setReservationStatus(true);
            const list = response.data;
        }
        else {
            setReservationStatus(false);
        }
    };
    useEffect(() => {
        getReserveList();
    },[]);
    return (
        <div>
            <LightReserveModal setVisible={addButtonListener} visible={modalVisible} room={room}/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h2>Light Reservation</h2>
                <div style={{cursor:'pointer'}} onClick={addButtonListener}>
                    <Image
                    alt="add button image"
                    src={AddIcon}
                    width={'80'}
                    height={'80'}
                    />
                </div>
            </div>
            <Card>
                <div className='content'>
                    {!reservationStatus && (
                        <Container style={{height:'5rem', width:'100%'}}>
                            <Stack direction="horizontal" style={{justifyContent:'center', display:'flex', alignItems:'center'}}>
                                <div style={{width:'5rem', height:'5rem', position:'relative', objectFit:'cover'}}>
                                    <Image
                                    alt="NoData"
                                    src={ErrorIcon}
                                    fill
                                    />
                                </div>
                                <p style={{marginTop:'0.7rem', fontSize:'2rem'}}>Error</p>
                            </Stack>
                        </Container>
                    )}
                    {reservationList.length == 0 && (
                        <Container style={{height:'5rem', width:'100%'}}>
                            <Stack direction="horizontal" style={{justifyContent:'center', display:'flex', alignItems:'center'}}>
                                <div style={{width:'5rem', height:'5rem', position:'relative', objectFit:'cover'}}>
                                    <Image
                                    alt="NoData"
                                    src={NoDataIcon}
                                    fill
                                    />
                                </div>
                                <p style={{marginTop:'0.7rem', fontSize:'2rem'}}>No Data</p>
                            </Stack>
                        </Container>
                    )}
                </div>
                <style jsx>{`
                .content {
                    padding: 1px 16px;
                }
                `}</style>
            </Card>
        </div>
    )
}
