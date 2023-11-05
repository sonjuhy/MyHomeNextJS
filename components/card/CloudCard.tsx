import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

import FileIcon from '/public/image/icon/file.png';
import FolderIcon from '/public/image/icon/folder.png';
import UpIcon from '/public/image/icon/up.png';
import ErrorIcon from '/public/image/icon/error.png';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type props = {
    uuid: string;
    name: string;
    type: string;
    path: string;
    mode: string;
}
type loaderProps = {
    src?: string;
};
export default function CloudCard({uuid, name, type, path, mode}:props): JSX.Element {
    const [imageSrc, setImageSrc] = useState('');

    const imagePublicLoader = ({src}:loaderProps) =>{
        return '/file/downloadPublicMedia/'+src;
    };

    const getImagePublicLoader = async (src:string) =>{
        const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        if (accessToken !== null) {
            var imageUrl = process.env.BASE_URL;
            if(mode === 'public') {
                imageUrl += '/file/downloadPublicMedia/' + src;
            }
            else {
                imageUrl += '/file/downloadPrivateMedia/' + src;
            }  
            await axios({
                headers: {'Authorization': accessToken},
                method: 'GET',
                url: imageUrl,
                responseType: 'blob',  // Set the response type to 'blob' to handle binary data
            })
            .then((response) => {
                const blob = new Blob([response.data]);
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
        }
      }

    const thumbNailLoader = ({src}:loaderProps) =>{
        return '/file/downloadThumbNail/'+src;
    };

    const getThumbNailLoader = async (uuid:string) =>{
        const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        if (accessToken !== null) {
            var imageUrl = process.env.BASE_URL + '/downloadThumbNail/'+uuid;

            await axios({
                headers: {'Authorization': accessToken},
                method: 'GET',
                url: imageUrl,
                responseType: 'blob',  // Set the response type to 'blob' to handle binary data
            })
            .then((response) => {
                const blob = new Blob([response.data]);
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
        }
    };

    useEffect(() =>{
        if(type === 'img') getImagePublicLoader(uuid);
        else if(type == 'video') getThumbNailLoader(uuid);
    });
    return (
        <Card className='shadow' style={{height:'13rem'}}>
            <br/>
            <Card.Title className='text-center' style={{width:'90%', fontSize:'1rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{name}</Card.Title>
            {type === 'img' && (
                <div style={{width:'100%',height:'70%',display:'flex',justifyContent:'center', alignItems:'center',marginTop:'0.5rem'}}>
                <OverlayTrigger 
                    key={uuid} 
                    placement={'top'}
                    overlay={
                            <Tooltip id={`tooltip-${name}`}>
                                {name}
                            </Tooltip>
                        }
                    >
                    <Image
                        src={imageSrc === '' ? ErrorIcon : imageSrc}
                        alt="cloud image"
                        width={0}
                        height={0}
                        style={{width: '8rem', height: '8rem'}}
                        loading="lazy"
                    />
                </OverlayTrigger>
                </div>
            )}
            {type === 'video' && (
                <div style={{width:'100%',height:'70%',display:'flex',justifyContent:'center', alignItems:'center',marginTop:'0.5rem'}}>
                <OverlayTrigger 
                    key={uuid} 
                    placement={'top'}
                    overlay={
                            <Tooltip id={`tooltip-${name}`}>
                                {name}
                            </Tooltip>
                        }
                    >
                    <Image
                        // loader={thumbNailLoader}
                        // src={uuid}
                        src={imageSrc === '' ? ErrorIcon : imageSrc}
                        alt="cloud image"
                        width={0}
                        height={0}
                        style={{width: '8rem', height: '8rem'}}
                        loading="lazy"
                    />
                </OverlayTrigger>
                </div>
            )}
            {(type === 'file' || type ==='dir' || type === 'up') &&(
                <div style={{width:'100%',height:'70%',display:'flex',justifyContent:'center', alignItems:'center',marginTop:'0.5rem'}}>
                    <OverlayTrigger 
                    key={uuid} 
                    placement={'top'}
                    overlay={
                            <Tooltip id={`tooltip-${name}`}>
                                {name}
                            </Tooltip>
                        }
                    >
                        <Image
                            alt="Light"
                            src={type === 'dir' ? FolderIcon : type==='up' ? UpIcon : FileIcon}
                            loading = 'lazy'
                            width={0}
                            height={0}
                            style={{width: '10rem', height: '10rem'}}
                        />
                    </OverlayTrigger>
                </div>
            )}
        </Card>
    );
}