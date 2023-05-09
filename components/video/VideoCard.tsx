import {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Card, Placeholder, Button} from "react-bootstrap";

const BASE_URL = 'http://192.168.0.18:8080/file';
const testBody = {
  "path": "testPath",
  "name": "video.png",
  "uuidName": "29788b59-7404-4aa8-aea4-649f5eae19cd",
  "type": "video/mp4",
  "size": 8035620,
  "location": "C:\\Users\\SonJunHyeok\\Desktop\\test\\"
};

type Props = {
  url? :string;
  uuid :string;
  loc? :string;
  src? :string;
}

{/* <VideoLoader url={'localhost:8080'} uuid={'c668fe69-e3aa-463d-9d93-4534e8f8ecb6'}/> */}

export default function loadVideo({url, uuid}:Props): JSX.Element{
    // console.log(url);
    let uuid_name:string = uuid;
    const [isWindow, setIsWindow] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() =>{
        setIsWindow(true);
    },[]);

    const handleBtn = ():void=>{
        setIsPlaying(true);
    }
    const readyToPlay = ():void=>{
      console.log("readyToPlay");
      setIsWindow(true);
    }

    return(
      <Card style={{ width: '30rem' }}>
        <div>
          <h2>NextJs VideoPlayer</h2>
          {isWindow && (
            <><div className='wrapper'>
              <ReactPlayer
                className='player'
                url={videoLoader(uuid_name)}
                width='100%'
                height='100%'
                controls={true}
                onReady={readyToPlay}
                playing={isPlaying}
                />
            </div><style jsx>
              {
                `.wrapper{
                    position: relative;
                }
                .player{
                  position: absolute;
                  top:0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                }
                `
              }
              </style></>
          )}
        </div>
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

const videoLoader = (src:String) =>{
  return BASE_URL+'/downloadPublicMedia/'+src;
}
