import axios from 'axios';
import { title } from 'process';
import { useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';

interface Notice{
    pk: number;
    title: string;
    content: string;
    writer: string;
    date: string;
}
type props = {
    notice: Notice;
    user: string;
}
export default function NoticeMainCard({notice, user}: props) {
    const [editMode, setEditMode] = useState(false);
    const [contentChange, setContentChange] = useState('');
    const [titleChange, setTitleChange] = useState('');
    
    const updateNotice = async () => {
        let obj: any = {
            id: notice.pk,
            title: titleChange,
            content: contentChange,
            writer: notice.writer,
            date: notice.date
        }
        await axios.request({
            url: '/notice/updateNotice',
            method: 'PUT',
            data: obj
        });
    }
    const removeNotice = async () => {
        const dataForm = new FormData();
        dataForm.append('pk', String(notice.pk));
        await axios.request({
            url: '/notice/updateNotice',
            method: 'DELETE',
            data: dataForm
        });
    }
    
  return (
    <div>
        <Form>
            {editMode && (
                <Form.Control plaintext={!editMode} readOnly={!editMode} defaultValue={notice.title} onChange={(e)=>{setTitleChange(e.target.value)}}/>
            )}
            <Form.Control plaintext={!editMode} readOnly={!editMode} defaultValue={notice.content} onChange={(e)=>{setContentChange(e.target.value)}}/>
            <Form.Control className='text-end' plaintext readOnly defaultValue={notice.writer} />
            <Form.Control className='text-end' plaintext readOnly defaultValue={notice.date.substr(0,4)+'년 '+Number(notice.date.substr(4,2))+'월 '+notice.date.substr(6)+'일'} />
            
            {(!editMode && user === notice.writer) && (
                <Button variant='primary' onClick={() => {setEditMode(!editMode)}}>설정</Button>
            )}
            {editMode && (
                <Stack direction='horizontal'>
                    <Button variant='secondary' style={{marginRight:'1rem'}} onClick={() => {setEditMode(!editMode)}}>취소</Button>
                    <Button variant='primary' style={{marginRight:'1rem'}} onClick={updateNotice}>수정</Button>
                    <Button variant='danger' onClick={removeNotice}>삭제</Button>
                </Stack>
            )}
        </Form>
    </div>
  );
}
