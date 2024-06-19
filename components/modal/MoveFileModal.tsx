import GetUserInfo from '@/modules/getUserInfo/getUserInfo';

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import Image from 'next/image';
import { Form, ListGroup, Row, Toast, ToastContainer } from 'react-bootstrap';

import LogoColor from '/public/image/icon/MyhomeIcon.png';
import sendToSpring from '@/modules/sendToSpring/sendToSpring';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

type ModalProps = {
    click: (result:boolean) => boolean;
    status: boolean;
    mode: string;
    location: string;
    selectedFileList : File[];
}
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

export default function MoveFileModal({ click, status, mode, location, selectedFileList }: ModalProps): JSX.Element {

    const defaultPublicLocation = useAppSelector((state)=>state.cloud.defaultPublicPath)+underBar;
    const defaultPrivateLocation = useAppSelector((state)=>state.cloud.defaultPrivatePath)+underBar;
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

    const [user, setUser] = useState<User>();
    const [movePath, setMovePath] = useState('');
    const [fileList, setFileList] = useState<File[]>();
    const [nowLocation, setNowLocation] = useState(location);
    const [selectedFileName , setSelectedFileName] = useState('');

    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function MoveFile(){
        var tmpUrl = '';
        if(mode == 'public') {
            tmpUrl = '/file/movePublicFileInfo';
        }
        else{
            tmpUrl = '/file/movePrivateFileInfo';
        }
        for(var idx in selectedFileList){
            var data = '';
            if(mode == 'public'){
                data = '?path='+ selectedFileList[idx].path+selectedFileList[idx].name + '&location='+ nowLocation;
            }
            else{
                data = '?path='+ selectedFileList[idx].path+selectedFileList[idx].name + '&location='+ nowLocation + '&accessToken='+ accessToken;
            }
            tmpUrl+=data;
            console.log(data);
            // const result = sendToSpring(tmpUrl, 'GET', '', '');
            // console.log(result);
        }
        exit(true);
    }

    async function getFileList(type:string, path:string) {
        console.log(type+', '+path);
        var tmpLink = '';
        if(type === 'up'){
            if(mode === 'public' && path === defaultPublicLocation){
                setErrorToast(true);
                setErrorMessage('이미 최상단 폴더입니다.');
            }
            else {
                var locationSplit: string[] = path.split(underBar);
                for(var i=0; i<locationSplit.length-2; i++){
                    tmpLink += locationSplit[i]+underBar;
                }
                setNowLocation(tmpLink);
                setMovePath(tmpLink.replace(mode === 'public' ? defaultPublicLocation : defaultPrivateLocation, '').replaceAll(underBar, ' > '));
            }
        }
        else{
            const tmpPath: string[] = path.split(mode === 'public' ? defaultPublicLocation : defaultPrivateLocation);
            
            if(tmpPath[1] !== '' && tmpPath !== undefined){
                tmpLink = tmpPath[1];
                tmpPath[1] = tmpPath[1].replaceAll(underBar, ' > ');
                setMovePath(tmpPath[1]);
            }
            else{
                setMovePath('최상위 폴더');
            }
            setNowLocation(path);
        }
        console.log(tmpLink);
        const link = mode ==='private' ? 'getPrivateFileListInfo/?location='+encodeURI(tmpLink) : 'getPublicFileListInfo/?location='+encodeURI(tmpLink); // for test

        const list:any = await sendToSpring('/file/'+link, 'GET', '', '');
        console.log(list);
        var tmpList: File[] = [];
        for(const idx in list.data){
            var tmpType = '';
            if(list.data[idx].type === 'dir') {
                tmpType='dir';
                let object: File ={
                    uuid: list.data[idx].uuid,
                    path: list.data[idx].path,
                    name: list.data[idx].name,
                    type: tmpType,
                    size: list.data[idx].size
                }
                tmpList.push(object);
            }
        }
        console.log(tmpList);
        let upObject: File = {
            uuid: 'move up',
            path: path,
            name: '위로가기',
            type: 'up',
            size: 0
        }
        tmpList.splice(0,0,upObject);
        setFileList(tmpList);
    }

    const exit = (close: boolean) => {
        if(mode === 'public'){
            setNowLocation(defaultPublicLocation);
        }
        else{
            setNowLocation(defaultPrivateLocation);
        }
        click(close);
    };
    useEffect(() => {
        getFileList('dir', nowLocation);
        var tmpName = '';
        for(var idx in selectedFileList){
            tmpName += selectedFileList[idx].name+',';
        }
        setSelectedFileName(tmpName);
        if(mode === 'private'){
            if (accessToken !== null) {
                GetUserInfo(accessToken)
                .then((data: User) => {
                    setUser(data);
                })
                .catch();
            }
        }
    },[])

    return (
        <div>
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={errorToast} onClose={() => { setErrorToast(false) }} delay={3000} autohide={true}>
                    <Toast.Header>
                        <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
                        <strong className="me-auto">폴더 선택 에러</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal show={status} onHide={() =>{
                        // click(false);
                        exit(false);
                    }} aria-labelledby="contained-modal-title-vcenter" centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{'이동할 폴더 선택'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType='multipart/form-data'>
                        <Form.Group>
                            <Form.Label htmlFor='file' style={{fontSize:'1rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}><strong>파일이동 : {selectedFileName}</strong></Form.Label>
                        </Form.Group>
                        <Form.Label htmlFor='file'>파일업로드 위치 : {movePath}</Form.Label>
                    </Form>
                    <ListGroup>
                        {fileList?.map((file, index) =>(
                            <ListGroup.Item action onClick={() => getFileList(file.type, file.path+underBar)} key={index}>
                            {file.name}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() =>{
                        // click(false);
                        exit(false);
                    }}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={MoveFile}>
                        이동
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}