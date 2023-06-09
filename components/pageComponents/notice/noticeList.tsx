import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

import NoticeMainCard from '@/components/card/NoticeMainCard';
import GetUserInfo from '@/modules/getUserInfo/getUserInfo';

interface Notice{
    pk: number;
    title: string;
    content: string;
    writer: string;
    date: string;
}
interface User {
    userId: number;
    id: string;
    name: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    auth: string;
}
type props = {
    user: string;
}
export default function NoticeListAccordion({user}:props) {
    const [noticeList, setNoticeList] = useState<Notice[]>([]);
    const [firstKey , setFirstKey] = useState("0");
    const [userName, setUserName] = useState(user);

    const getNoticeList = async () =>{
        const result = await axios.request({
            url: 'notice/getAllNotice',
            method: 'GET',
        });
        var tmpNoticeList: Notice[] = [];
        for(var idx in result.data){
            let obj: Notice = {
                pk: result.data[idx].id,
                title: result.data[idx].title,
                content: result.data[idx].content,
                writer: result.data[idx].writer,
                date: result.data[idx].date
            }
            tmpNoticeList.push(obj);
        }
        setNoticeList(tmpNoticeList.reverse());
        setFirstKey(String(tmpNoticeList[0].pk));
    }

    useEffect(() => {
        getNoticeList();
    },[]);
  return (
    <Container>
        <Accordion defaultActiveKey={[firstKey]} alwaysOpen>
            {Array.from({length : noticeList.length}).map((_, index: number) => (
                <Col key={noticeList[index].pk}>
                    <Container>
                        <Accordion.Item eventKey={String(noticeList[index].pk)}>
                            <Accordion.Header>{noticeList[index].title}</Accordion.Header>
                            <Accordion.Body>
                                <NoticeMainCard notice={noticeList[index]} user={userName}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Container>
                </Col>
            ))}
        </Accordion>
    </Container>
  );
}
