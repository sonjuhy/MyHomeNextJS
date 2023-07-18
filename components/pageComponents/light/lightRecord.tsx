import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { useEffect, useState } from "react";
import Image from 'next/image';

import {Card, Col, Container, Form, Row, Stack} from 'react-bootstrap';

type props = {
    room: roomInfo;
}
interface roomInfo{
    room: string;
    state: string;
    kor: string;
    category: string;
    connect: string;
}
export default function lightRecord({room}:props):JSX.Element {

   
    return (
        <div>
            <h2>Devices Record</h2>
            <Container>
            </Container>
            <style jsx>{`
                .content {
                    padding: 1px 16px;
                }
                `}</style>
        </div>
    )
}
