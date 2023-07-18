import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { useEffect, useState } from "react";
import Image from 'next/image';

import OffImage from '/public/image/icon/light-off-cardview.png'
import OnImage from '/public/image/icon/light-on-cardview.png';
import Disconnection from '/public/image/icon/disconnection.png';

import {Card, Col, Container, Form, Row, Stack} from 'react-bootstrap';

type props = {
    roomData: roomInfo;
}
interface roomInfo{
    room: string;
    state: string;
    kor: string;
    category: string;
    connect: string;
}
export default function lightStatus({roomData}:props):JSX.Element {
    const [status, setStatus]  = useState(false);
    const [connection, setConnection] = useState(false);

    const changeStatus = async () => {
        const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        const bodyData = {
            room: roomData.room,
            kor: roomData.kor,
            category: roomData.category,
            state: status ? 'Off' : 'On',
            connect: roomData.connect
        }
        const response  = await sendToSpring('/light/control/'+accessToken, 'POST', bodyData, '');
        if(response.result === 200){
            setStatus(!status);
        }
    };
    
   useEffect(() => {
    roomData.state === 'Off' ? setStatus(false) : setStatus(true);
    roomData.connect === 'Off' ? setConnection(false) : setConnection(true);
   },[roomData]);
    return (
        <div>
            <h2>Devices Status</h2>
            <Container fluid>
                <Row>
                    <Col sm={6} md={3} lg={3}>
                        <Card className="shadow" style={{height:'12rem'}}>
                            <Card.Body>
                                <Card.Title className="text-center">정보</Card.Title>
                                <Card.Text className="text-center" style={{fontSize:'1rem', marginTop:'2rem'}}>꺼저있습니다.</Card.Text>
                                <Card.Text className="text-center" style={{fontSize:'1rem'}}>방이름 : {roomData.kor}.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={3} lg={3}>
                        <Card className="shadow" style={{height:'12rem'}}>
                            <Card.Body>
                                <Card.Title className="text-center">상태</Card.Title>
                                <div style={{justifyContent:'center', display:'flex'}}>
                                    <Image
                                    alt='status image'
                                    src={connection ? status ? OnImage : OffImage : Disconnection}
                                    width={'80'}
                                    height={'80'}
                                    />
                                </div>
                                <Card.Text className="text-center" style={{fontSize:'1rem'}}>
                                    {connection ? status ? '켜져있습니다.' : '꺼저있습니다.' : '연결이 끊어졌습니다.'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={3} lg={3}>
                        <Card className="shadow" style={{height:'12rem'}}>
                        <Card.Body>
                                <Card.Title className="text-center">제어</Card.Title>
                                <div style={{justifyContent:'center', display:'flex', alignItems:'center' ,height:'55%', cursor:'pointer'}}>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            checked={status}
                                            onChange={()=>{console.log('Check');}}
                                        />
                                    </Form>
                                </div>
                                <Card.Text className="text-center" style={{fontSize:'1rem'}}>
                                    {status ? '켜져있습니다.' : '꺼저있습니다.'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={3} lg={3}>
                        <Card className="shadow" style={{height:'12rem'}}>
                        <Card.Body>
                                <Card.Title className="text-center">상태</Card.Title>
                                <div style={{justifyContent:'center', display:'flex'}}>

                                </div>
                                <Image
                                alt='status image'
                                src={OffImage}
                                width={'80'}
                                height={'80'}
                                />
                                <Card.Text className="text-center" style={{fontSize:'1rem'}}>꺼저있습니다.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <style jsx>{`
                .content {
                    padding: 1px 16px;
                }
                `}</style>
        </div>
    )
}
