import axios from 'axios';
import { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

type props = {
    user: string;
    addNoticeRefresh: () => void;
}
interface Notice{
    pk: number;
    title: string;
    content: string;
    writer: string;
    date: string;
}
export default function AddNotice({user, addNoticeRefresh}:props) {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const addNotice = async () => {
    let today = new Date();   

    let obj: Notice = {
        pk: 0,
        title: title,
        content: content,
        writer: user,
        date: String(today.getFullYear())+String(today.getMonth()+1)+String(today.getDate())
    }
    await axios.request({
        url: 'notice/setNotice',
        method: 'POST',
        data: obj,
    });
    addNoticeRefresh();
  }

  return (
    <Card>
        <Container style={{marginTop:'1rem', marginBottom:'1rem'}}>
            <Form style={{height:'90%', width:'90%', margin:'0 auto'}}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="email" placeholder="제목을 입력하세요." onChange={(e) =>{setTitle(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>내용</Form.Label>
                    <Form.Control type="password" placeholder="내용을 입력하세요." onChange={(e) =>{setContent(e.target.value)}}/>
                </Form.Group>
                <div style={{display:'flex', justifyContent:'right'}}>
                    <Button>생성</Button>
                </div>
            </Form>
        </Container>
    </Card>
  );
}