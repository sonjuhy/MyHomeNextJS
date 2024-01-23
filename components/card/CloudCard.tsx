import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';

import FileIcon from '/public/image/icon/file.png';
import FolderIcon from '/public/image/icon/folder.png';
import UpIcon from '/public/image/icon/up.png';
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
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    const imagePublicLoader = ({src}:loaderProps) =>{
        return '/file/downloadPublicMedia/'+src+'/'+accessToken;
    };

    const imagePrivateLoader = ({src}:loaderProps) =>{
        return '/file/downloadPrivateMedia/'+src+'/'+accessToken;
    };

    const thumbNailLoader = ({src}:loaderProps) =>{
        console.log('/file/downloadThumbNail/'+src+'/'+accessToken);
        return '/file/downloadThumbNail/'+src+'/'+accessToken;
    };

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
                        loader={mode === 'public' ? imagePublicLoader : imagePrivateLoader}
                        src={uuid}
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
                        loader={thumbNailLoader}
                        src={uuid}
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