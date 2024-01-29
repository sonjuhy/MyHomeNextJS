import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import LightOffIcon from '/public/image/icon/light-off-cardview.png';
import LightOnIcon from '/public/image/icon/light-on-cardview.png';
import { Col, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import sendToSpring from '@/modules/sendToSpring/sendToSpring';

interface Room {
    name: string;
    krName: string;
    category: string;
    status: string;
    connect: string;
}

function WithHeaderStyledExample(): JSX.Element {
    const [roomList, setRoomList] = useState<Room[]>([]);
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    
    async function getLightList(){
        const list:any = await sendToSpring('/light/getAllList', 'GET','','');
        
        var room_list: Room[] = [];

        for (const idx in list.data){
            if(list.data[idx].connect == 'Off') continue;
            let object: Room = {
                name: list.data[idx].room, 
                krName: list.data[idx].kor, 
                category: list.data[idx].category,
                status: list.data[idx].state,
                connect: list.data[idx].connect
            }
            room_list.push(object);
        }
        setRoomList(room_list);
    }
    // use axios connection to server(GET) and control iot
    async function lightControl (room: Room){
        
        const bodyData = {
            room: room.name,
            kor: room.krName,
            category: room.category,
            state: room.status,
            connect: room.connect
        }
        const response  = await sendToSpring('/light/control/'+accessToken, 'POST', bodyData, '');

        setTimeout(getLightList, 500);
    }
    useEffect(()=>{
        getLightList();
    },[]);
    return (
        <Card bg={'light'} className='shadow p-3 mb-5 rounded'>
            <Row className='g-4'>
                {Array.from({ length: roomList.length }).map((_, index: number) => (
                    <Col key={roomList[index].name}>
                        <Container style={{padding:'2vh', width:'12rem'}}>
                            <Card className='shadow'>
                                <br/>
                                <Card.Title className='text-center' style={{fontSize:'1rem'}}>{(roomList[index] as Room).krName}</Card.Title>
                                <OverlayTrigger 
                                key={roomList[index].name} 
                                placement={'top'}
                                overlay={
                                        <Tooltip id={`tooltip-${roomList[index].name}`}>
                                            불이 {roomList[index].status === 'On' ? '켜져있습니다.' : '꺼져있습니다.'}
                                        </Tooltip>
                                    }
                                >
                                    <Image
                                        alt="Light"
                                        src={(roomList[index] as Room).status === 'On' ? LightOnIcon : LightOffIcon}
                                        loading = 'lazy'
                                        width={0}
                                        height={0}
                                        style={{width: '100%', height: '100%'}}
                                    />
                                </OverlayTrigger>
                                <Button variant={roomList[index].status === 'On' ? 'info' : 'primary'} onClick={() => {
                                    lightControl(roomList[index])
                                }}>{(roomList[index] as Room).status === 'On' ? 'OFF' : 'ON'}</Button>
                            </Card>
                        </Container>
                    </Col>
                ))}
            </Row>
        </Card>
    );
}

export default WithHeaderStyledExample;