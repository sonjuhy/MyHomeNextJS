import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ReactPlayer from "react-player";
import Image from 'next/image';
import axios from 'axios';

import FileIcon from '/public/image/icon/file.png';
import ErrorIcon from '/public/image/icon/error.png';

import Loading from '@/components/loading/Loading'
import Spinner from  '@/public/image/img/spinner.gif'

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
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const mediaPublicLoader = ({src}:loaderProps) =>{
    return '/file/downloadPublicMedia/'+src+'/'+accessToken;
  };

  const mediaPrivateLoader = ({src}:loaderProps) =>{
      return '/file/downloadPrivateMedia/'+src+'/'+accessToken;
  };

  const videoLoader = (info:string, mode:string) => {
    if(mode === 'public') return '/file/streamingPublicVideo/'+info+'/'+accessToken;
    else return '/file/streamingPrivateVideo/'+info+'/'+accessToken;
  }
  
  async function DownloadFile(){
    if (accessToken !== null) {
      var tmpUrl = '';
      if(mode == 'public') {
        tmpUrl = '/file/downloadPublicFile';
      }
      else{
        tmpUrl = '/file/downloadPrivateFile';
      }
      await axios({
        headers : {'Authorization' : accessToken},
        method: 'POST',
        url: tmpUrl,
        responseType: 'blob',  // Set the response type to 'blob' to handle binary data
        data:{
          path: '',
          name: 'download',
          uuid: info,
          type: 'file',
          size: 0,
          location: '',
          state: 0,
        },
      })
        .then((response) => {
          console.log(response);
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
            {/* {!loading && (
              <div style={{ opacity:'1', transform:'translate(-50%, -50%)'}}>
                  <Loading showText={false}/>
              </div>
            )} */}
            <Image
              loader={mode === 'public' ? mediaPublicLoader : mediaPrivateLoader}
              src={info}
              alt="cloud image"
              width={0}
              height={0}
              style={{width:'90%', height:'90%'}}
              loading="lazy"
              // onLoadingComplete={()=>setLoading(true)}
              onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = event.target as HTMLImageElement;
                target.src = '/public/image/icon/error.png';
              }}
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