import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ReactPlayer from "react-player";
import Image from 'next/image';
import axios from 'axios';

import FileIcon from '/public/image/icon/file.png';

type ModalProps = {
  click: () => boolean;
  status: boolean;
  info: string;
  mode: string;
  type: string;
  name: string;
}
type loaderProps = {
  src?: string;
};
export default function ImageModal({click, status, info, mode, type, name}: ModalProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const mediaPublicLoader = ({src}:loaderProps) =>{
    return process.env.BASE_URL+'/file/downloadPublicMedia/'+src;
  };

  const mediaPrivateLoader = ({src}:loaderProps) =>{
      return process.env.BASE_URL+'/file/downloadPrivateMedia/'+src;
  };

  const videoLoader = (info:string, mode:string) => {
    if(mode === 'public') return process.env.BASE_URL+'/file/downloadPublicMedia/'+info;
    else return process.env.BASE_URL+'/file/downloadPrivateMedia/'+info;;
  }
  
  async function DownloadFile(){
    console.log('DownloadFile : '+info);
    var tmpUrl = '';
    if(mode == 'public') {
      tmpUrl = '/file/downloadPublicFile';
    }
    else{
      tmpUrl = '/file/downloadPrivateFile';
    }
    await axios({
      method: 'POST',
      url: process.env.BASE_URL+tmpUrl,
      responseType: 'blob',  // Set the response type to 'blob' to handle binary data
      data:{
        path: '',
        name: 'download',
        uuidName: info,
        type: 'file',
        size: 0,
        location: '',
        state: 0,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name); // Set the desired filename and extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  }

  return (
    <div>
      <Modal show={status} onHide={click} aria-labelledby="contained-modal-title-vcenter" centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {type === 'img' && (
          
          <div style={{width:'100%',height:'70%',display:'flex',justifyContent:'center', alignItems:'center',marginTop:'0.5rem'}}>
            <Image
              loader={mode === 'public' ? mediaPublicLoader : mediaPrivateLoader}
              src={info}
              alt="cloud image"
              width={0}
              height={0}
              style={{width:'90%', height:'90%'}}
              loading="lazy"
            />
          </div>
        )}
        {type === 'video' &&(
          <ReactPlayer
            className="player"
            url={videoLoader(info, mode)}
            controls={true}
            playing={isPlaying}
            width='100%'
            height='100%'
          />
        )}
        {type === 'file' && (
          <div style={{width:'100%',height:'70%',display:'flex',justifyContent:'center', alignItems:'center',marginTop:'0.5rem'}}>
            <Image
              src={FileIcon}
              alt="cloud image"
              width={0}
              height={0}
              style={{width:'70%', height:'70%'}}
              loading="lazy"
            />
          </div>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={click}>
            닫기
          </Button>
          <Button variant="primary" onClick={DownloadFile}>
            다운로드
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}