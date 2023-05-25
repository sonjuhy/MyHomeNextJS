import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import LightOffIcon from '/public/image/icon/light-off-cardview.png';
import LightOnIcon from '/public/image/icon/light-on-cardview.png';
import { Col, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';

interface Room {
    name: string;
    krName: string;
    category: string;
    status: string;
    connect: string;
}

function WithHeaderStyledExample(): JSX.Element {
    const [roomList, setRoomList] = useState<Room[]>([]);

    async function getLightList(){
        const list:any = await axios.request({
            url: process.env.BASE_URL+'/light/getAllList',
            method: 'GET'
        });
        
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
        var accessToken = sessionStorage.getItem('accessToken');
        const data:any = await axios.request({
            url: process.env.BASE_URL+'/light/control/'+accessToken,
            method: 'POST',
            data:{
                room: room.name,
                kor: room.krName,
                category: room.category,
                state: room.status,
                connect: room.connect
            }
        });
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
                                <Card.Title className='text-center'>{(roomList[index] as Room).krName}</Card.Title>
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
                                        layout="responsive"
                                    />
                                </OverlayTrigger>
                                {/* <Card.Text>
                                    {(room_list[index] as Room).status}
                                </Card.Text> */}
                                <Button variant="primary" onClick={() => {
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