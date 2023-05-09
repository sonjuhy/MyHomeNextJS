import { ChangeEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";

import {Card, Button} from 'react-bootstrap'
import { test } from "node:test";

const BASE_URL = 'http://192.168.0.18:8080/file';
const testBody = {
  "path": "testPath",
  "name": "json.png",
  "uuidName": "f826a736-e29a-4320-98cb-7fcd186ca22c",
  "type": "image/png",
  "size": 23538,
  "location": "C:\\Users\\SonJunHyeok\\Desktop\\test\\"
};

type Props = {
  url? :string;
  loc? :string;
  src? :string;
}
export default function loadImage({url}:Props): JSX.Element{
    const [imageSrc, setImageSrc] = useState('');

    let uuid:string = testBody['uuidName'];
    console.log(url);
    return(
      // <Card.Img variant="top" src={imageLoader(uuid)} />
        <Card style={{ width: '18rem' }}>
          <p>Image content</p>
          <Image
            loader={imageLoader}
            src={testBody['uuidName']}
            alt="test image"
            width={500}
            height={300}
            loading="lazy"
            layout="responsive"
          />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        
    )
}
const imageLoader = ({src}:Props) =>{
  return BASE_URL+'/downloadPublicMedia/'+src;
}
const readImage = async (bodyData: {}) =>{

  const data = await axios(
      BASE_URL+'/downloadPublicFile',
      {
        headers:{
          'Authorization': 'Basic',
          'Content-Type': 'application/json'
        },
        data: testBody,
        method: 'POST'
      }
    );
  return data;
}