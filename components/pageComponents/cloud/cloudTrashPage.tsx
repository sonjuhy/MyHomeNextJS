import GetUserInfo from '@/modules/getUserInfo/getUserInfo';

import CardCloud from '@/components/card/CloudCard';

import axios from 'axios';
import { useEffect, useState } from "react";
import Image from 'next/image';

import {Button, Stack, Row, Col, Container, Tabs, Tab, ToastContainer, Toast} from 'react-bootstrap';

import LogoColor from '/public/image/icon/MyhomeIcon.png';
import NoneFileIcon from '/public/image/icon/nofile.png';
import sendToSpring from '@/modules/sendToSpring/sendToSpring';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Loading from '@/components/loading/Loading';
import { incrementPageCount, setNowPathStatic, setPageCount } from '@/lib/redux/features/cloud/cloudSlice';

interface File {
    uuid: string;
    path: string;
    name: string;
    type: string;
    size: number;
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

let underBar = '__';

export default function Main() {
    const [dirLoading, setDirLoading] = useState(false);

    const defaultPublicLocation = useAppSelector((state)=>state.cloud.defaultTrashPublicPath)+underBar;
    const defaultPrivateLocation = useAppSelector((state)=>state.cloud.defaultTrashPrivatePath)+underBar;
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

    const userId = useAppSelector((state) => state.auth.id);
    const [stageMode, setStageMode] = useState<string>('public');
    const [place, setPlace] = useState<string>(defaultPublicLocation);
    const [downloadMode, setDownloadMode] = useState(false);
    const [publicFileList, setPublicFileList] = useState<File[]>([]);
    const [privateFileList, setPrivateFileList] = useState<File[]>([]);
    const [location, setLocation] = useState(defaultPublicLocation);
    const [selectedFileList, setSelectFileList] = useState<File[]>([]);
    
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [nowPath, setNowPath] = useState('');
    
    var imageExtension = ['bmp', 'png', 'gif', 'jpg', 'jpeg', 'pnm'];
    var videoExtension = ['mp4', 'avi', 'mov', 'wmv', 'avchd', 'webm', 'mpeg4'];


    async function getFileList(mode:string) {
        setDirLoading(true);
        const link = mode ==='private' ? 'getPrivateTrashFileListInfo/?location='+encodeURI(location) : 'getPublicTrashFileListInfo/?location='+encodeURI(location);
        setPlace(location);
        console.log(link);
        const response = await sendToSpring('/file/'+link, 'GET', null, null);
        if(response.result === 200){
            const list:any = response.data;
            console.log(list);
            var tmpList: File[] = [];
            console.log(list.data);
            for(const idx in list.data){

                var tmpType = '';
                if(imageExtension.includes(list.data[idx].type.toLowerCase())) tmpType='img';
                else if(videoExtension.includes(list.data[idx].type.toLowerCase())) tmpType='video';
                else if(list.data[idx].type === 'dir') tmpType='dir';
                else tmpType='file';

                let object: File ={
                    uuid: list.data[idx].uuid,
                    path: list.data[idx].path,
                    name: list.data[idx].name,
                    type: tmpType,
                    size: list.data[idx].size
                }
                tmpList.push(object);
            }
            tmpList.sort(function(a,b){
                if(a.type === 'dir' && b.type !== 'dir') return -1;
                else if(a.type !== 'dir' && b.type !== 'dir'){
                    if(a.type === 'img' && b.type !== a.type) return -1;
                    else if(a.type !== 'img' && b.type !== 'img'){
                        if(a.type === 'video' && b.type !== 'video') return -1;
                        else return 1;
                    }
                }
                return 1;
            });
            if(mode === 'public'){
                setPublicFileList(tmpList);
            }
            else{
                setPrivateFileList(tmpList);
            }
        }
        setDirLoading(false);
    }

    function itemSelect(uuid: string, name: string, type: string){
        let object = {
            uuid: uuid,
            path: location,
            name: name,
            type: type,
            size: 0
        }
        if(selectedFileList.findIndex(e => e.uuid === uuid) !== -1){
            setSelectFileList(selectedFileList.filter(e => e.uuid !== uuid))
        }
        else{
            setSelectFileList(selectedFileList => [...selectedFileList, object])
        }
    }

    const removeFile = async() => {
        if(stageMode === 'public'){
            for(var idx in selectedFileList){
                await sendToSpring('/file/deletePublicFileInfo/'+selectedFileList[idx].path, 'DELETE', null, 'null');
            }
            getFileList('public');
        }
        else{
            const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
            for(var idx in selectedFileList){
                const data = {
                    path:selectedFileList[idx].path,
                    accessToken: accessToken,
                }
                sendToSpring('/file/deletePrivateFileInfo/', 'DELETE', data, 'null');
            }
            getFileList('private');
        }
        setSelectFileList([]);
    };

    const restoreFile = async () => {
        if(stageMode === 'public'){
            if(nowPath === defaultPublicLocation){
                for(var idx in selectedFileList){
                    await sendToSpring('/file/restorePublicFile/?uuid='+selectedFileList[idx].uuid, 'PUT', null, 'null');
                }
                getFileList('public');
            }
            else{
                setErrorMessage("최상위 폴더에 있는 내용만 복원 가능합니다.");
                setErrorToast(!errorToast);
            }
        }
        else{
            if(nowPath === defaultPrivateLocation){
                const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
                for(var idx in selectedFileList){
                    const data = {
                        uuid:selectedFileList[idx].uuid,
                        accessToken:accessToken,
                    }
                    await sendToSpring('/file/restorePrivateFile/?uuid=', 'PUT', data, 'null');
                }
                getFileList('private');
                setSelectFileList([]);
            }
            else{
                setErrorMessage("최상위 폴더에 있는 내용만 복원 가능합니다.");
                setErrorToast(!errorToast);
            }
        }        
    }

    useEffect(() => {
        if(stageMode === 'public') {
            setLocation(defaultPublicLocation);
        }
        else{
            setLocation(defaultPrivateLocation+userId+underBar);
        }
    },[stageMode]);

    useEffect(() => {
        getFileList(stageMode);
        if(stageMode === 'public') {setNowPath(location === defaultPublicLocation ? '최상위 폴더' : location.replace(defaultPublicLocation, '').replaceAll(underBar, ' > '))}
        else { setNowPath(location === defaultPrivateLocation ? '최상위 폴더' : location.replace(defaultPrivateLocation, '').replaceAll(underBar, ' > '))}
        
    },[location]);
    return (
        <>
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={errorToast} onClose={() => { setErrorToast(false) }} delay={3000} autohide={true}>
                    <Toast.Header>
                        <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
                        <strong className="me-auto">권한 에러</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className='content'>
                <br/>
                <h1>Cloud</h1>
                <Stack direction="horizontal" style={{marginBottom:'1rem'}}>
                    <Button className='btn-content' variant="success" style={{marginRight:'1rem'}} onClick={restoreFile}>복원</Button>
                    <Button className='btn-content' variant="danger" style={{marginRight:'1rem'}} onClick={removeFile}>삭제</Button>
                    <Button className='btn-content' variant="warning" onClick={()=>{
                        setSelectFileList([]);
                        }}>취소</Button>
                </Stack>
                <Tabs defaultActiveKey='public' fill activeKey={stageMode} onSelect={(k) => {
                    if(typeof(k) === 'string') {
                        setStageMode(k);
                    }
                }} >
                    <Tab eventKey='public' title='Public'>
                        {dirLoading ? (
                            <div style={{justifyContent:'center', display:'flex', marginTop:'20vh'}}>
                                <Loading showText={true}/>
                            </div>
                        ) : (
                            <Row className='g-4'>
                                {publicFileList.length !== 0 && (
                                    Array.from({ length: publicFileList.length }).map((_, index: number) => (
                                        <Col key={publicFileList[index].name}>
                                            <Container style={{padding:'2vh', width:'12rem'}}>
                                                <div 
                                                className={`cardDiv ${selectedFileList.findIndex(e => e.uuid === publicFileList[index].uuid) !== -1 ? 'border rounded-3 border-primary border-2' : ''}` } 
                                                onClick={(key) => 
                                                {itemSelect(publicFileList[index].uuid, publicFileList[index].name, publicFileList[index].type)}}>
                                                    <CardCloud uuid={publicFileList[index].uuid} name={publicFileList[index].name} type={publicFileList[index].type === 'dir' ? 'dir' : 'file'} path={publicFileList[index].path} mode={'public'}/>
                                                </div>
                                            </Container>
                                        </Col>
                                    ))
                                )}
                                {publicFileList.length === 0 && (
                                    <div style={{textAlign:'center', marginTop:'4rem'}}>
                                        <Image
                                        alt="none file"
                                        src={NoneFileIcon}
                                        />
                                        <p className='text-center text-secondary' style={{fontSize:'3rem'}}>폴더가 비어있습니다.</p>
                                    </div>
                                )}
                            </Row>
                        )}
                    </Tab>
                    <Tab eventKey='private' title='Private'>
                        {dirLoading ? (
                            <div style={{justifyContent:'center', display:'flex', marginTop:'20vh'}}>
                                <Loading showText={true}/>
                            </div>
                        ) : (
                            <Row className='g-4'>
                                {privateFileList.length !== 0 && (
                                    Array.from({ length: privateFileList.length }).map((_, index: number) => (
                                        <Col key={privateFileList[index].name}>
                                            <Container style={{padding:'2vh', width:'12rem'}}>
                                                <div 
                                                className={`cardDiv ${selectedFileList.findIndex(e => e.uuid === privateFileList[index].uuid) !== -1 ? 'border rounded-3 border-primary border-2' : ''}` } 
                                                onClick={(key) => 
                                                {itemSelect(privateFileList[index].uuid, privateFileList[index].name, privateFileList[index].type)}}>
                                                    <CardCloud uuid={privateFileList[index].uuid} name={privateFileList[index].name} type={privateFileList[index].type === 'dir' ? 'dir' : 'file'} path={privateFileList[index].path} mode={'private'}/>
                                                </div>
                                            </Container>
                                        </Col>
                                    ))
                                )}
                                {privateFileList.length === 0 && (
                                    <div style={{textAlign:'center', marginTop:'4rem'}}>
                                        <Image
                                        alt="none file"
                                        src={NoneFileIcon}
                                        />
                                        <p className='text-center text-secondary' style={{fontSize:'3rem'}}>폴더가 비어있습니다.</p>
                                    </div>
                                )}
                                
                            </Row>
                        )}
                        
                    </Tab>
                </Tabs>
                
            </div>
            <style jsx>{`
            .content {
                margin-left: 12vw;
                padding: 1px 16px;
            }
            .cardDiv-activate{
                border: 1px soild green;
                background: light-green;
            }
            `}</style>
        </>
    )
}
