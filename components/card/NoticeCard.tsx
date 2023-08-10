import sendToSpring from '@/modules/sendToSpring/sendToSpring';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

function WithHeaderAndQuoteExample() {
    const [title, setTitle] = useState('Notice Title');
    const [content, setContent] = useState('This is a space that displays what you have written as a notice.');
    const [writer, setWriter] = useState('writer');
    
    async function getLastNotice(){
      const response = await sendToSpring('/notice/getTopNotice', 'GET', '','');
      var notice:any = response.data;
      setTitle(notice.title);
      setContent(notice.content);
      setWriter(notice.writer);
    }
  useEffect(()=>{
    getLastNotice();
  })
  return (
    <Card className='shadow p-3 mb-5 rounded'>
      {/* <Card.Header>{title}</Card.Header> */}
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {title}
            {' '}
          </p>
          <p>
            {' '}
            {content}
          </p>
          <footer className="blockquote-footer text-end">
            {writer}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default WithHeaderAndQuoteExample;