import { useState } from 'react';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import LightOffIcon from '/public/image/icon/light-off-cardview.png';
import LightOnIcon from '/public/image/icon/light-on-cardview.png';
import { Col, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Room {
    name: string;
    status: string;
}

function WithHeaderStyledExample(): JSX.Element {

    // this is test code. this code will be changed axios code
    let strObj: Room = { name: 'living room', status: 'on' };
    let strObj1: Room = { name: 'kitchen', status: 'off' };
    let strObj2: Room = { name: 'small room', status: 'off' };
    let strObj3: Room = { name: 'bath room', status: 'on' };
    let strObj4: Room = { name: 'middle room', status: 'on' };
    let strObj5: Room = { name: 'big room', status: 'on' };
    let strObj6: Room = { name: 'balcony', status: 'on' };
    let strObj7: Room = { name: 'living1 room', status: 'on' };
    let strObj8: Room = { name: 'living2 room', status: 'off' };
    let strObj9: Room = { name: 'living3 room', status: 'off' };

    var room_list: Room[] = [];
    room_list.push(strObj, strObj1, strObj2, strObj3, strObj4, strObj5, strObj6, strObj7, strObj8, strObj9);

    // use axios connection to server(GET) and control iot
    function lightControl (name:string, action:string){
        console.log(name, action);
    }
    return (
        <Card bg={'light'} className='shadow p-3 mb-5 rounded'>
            <Row className='g-4'>
                {Array.from({ length: room_list.length }).map((_, index: number) => (
                    <Col key={room_list[index].name}>
                        <Container style={{padding:'2vh', width:'12rem'}}>
                            <Card className='shadow' >
                                <br/>
                                <Card.Title className='text-center'>{(room_list[index] as Room).name}</Card.Title>
                                <OverlayTrigger 
                                key={room_list[index].name} 
                                placement={'top'}
                                overlay={
                                        <Tooltip id={`tooltip-${room_list[index].name}`}>
                                            불이 {room_list[index].status === 'on' ? '켜져있습니다.' : '꺼져있습니다.'}
                                        </Tooltip>
                                    }
                                >
                                    <Image
                                        alt="Light"
                                        src={(room_list[index] as Room).status === 'on' ? LightOnIcon : LightOffIcon}
                                        loading = 'lazy'
                                        layout="responsive"
                                    />
                                </OverlayTrigger>
                                {/* <Card.Text>
                                    {(room_list[index] as Room).status}
                                </Card.Text> */}
                                <Button variant="primary" onClick={() => {
                                    lightControl((room_list[index] as Room).name, (room_list[index] as Room).status === 'on' ? 'OFF' : 'ON')
                                }}>{(room_list[index] as Room).status === 'on' ? 'OFF' : 'ON'}</Button>
                            </Card>
                        </Container>
                    </Col>
                ))}
            </Row>
        </Card>
    );
}

export default WithHeaderStyledExample;