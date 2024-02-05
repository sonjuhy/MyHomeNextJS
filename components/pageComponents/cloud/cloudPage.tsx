import CardCloud from '@/components/card/CloudCard';
import ImageModal from '@/components/modal/ImageModal';
import UploadModal from '@/components/modal/UploadModal';
import MkdirModal from '@/components/modal/MkdirModal';
import MoveFileModal from '@/components/modal/MoveFileModal';

import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image';

import { Button, Stack, Row, Col, Container, Tabs, Tab, ToastContainer, Toast } from 'react-bootstrap';

import LogoColor from '/public/image/icon/MyhomeIcon.png';
import NoneFileIcon from '/public/image/icon/nofile.png';
import sendToSpring from '@/modules/sendToSpring/sendToSpring';
import DownloadIcon from '/public/image/icon/download.png';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Loading from '@/components/loading/Loading';
import { incrementPageCount, setNowPathStatic, setPageCount } from '@/lib/redux/features/cloud/cloudSlice';
import { motion } from 'framer-motion';

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

    const defaultPublicLocation = useAppSelector((state)=>state.cloud.defaultPublicPath)+underBar;
    const defaultPrivateLocation = useAppSelector((state)=>state.cloud.defaultPrivatePath)+underBar;
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
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [mkdirModalVisible, setMkdirModalVisible] = useState(false);
    const [moveModalVisible, setMoveModalVisible] = useState(false);
    const [moreInfoVisible, setMoreInfoVisible] = useState(true);
    const [fileUUID, setFileUUID] = useState('');
    const [selectFileType, setSelectFileType] = useState('');
    const [selectFileName, setSelectFileName] = useState('');
    const [nowPath, setNowPath] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    
    const dispatch = useAppDispatch();

    var imageExtension = ['bmp', 'png', 'gif', 'jpg', 'jpeg', 'pnm'];
    var videoExtension = ['mp4', 'avi', 'mov', 'wmv', 'avchd', 'webm', 'mpeg4'];

    async function getFileList(newDirectory: boolean) {
        if(newDirectory === true){
            setDirLoading(true);
        }
        if (accessToken !== null) {
            var tmpList: File[] = [];
            var link;
            if (stageMode === 'public') {
                link = 'getPublicFileListInfoPage/?location=' + encodeURI(location) + '&size=20&page=' + pageNumber;
            }
            else {
                link = 'getPrivateFileListInfoPage/?location=' + encodeURI(location) + '&size=20&page=' + pageNumber;
            }
            console.log(link);
            const list: any = await sendToSpring('/file/' + link, 'GET', '', '');
            if(list.data.length > 0) {
                for (const idx in list.data) {
                    var tmpType = '';
                    if (imageExtension.includes(list.data[idx].type.toLowerCase())) tmpType = 'img';
                    else if (videoExtension.includes(list.data[idx].type.toLowerCase())) tmpType = 'video';
                    else if (list.data[idx].type === 'dir') tmpType = 'dir';
                    else tmpType = 'file';
    
                    let object: File = {
                        uuid: list.data[idx].uuid,
                        path: list.data[idx].path,
                        name: list.data[idx].name,
                        type: tmpType,
                        size: list.data[idx].size
                    }
                    tmpList.push(object);
                }
                tmpList.sort(function (a, b) {
                    if (a.type === 'dir' && b.type !== 'dir') return -1;
                    else if (a.type !== 'dir' && b.type !== 'dir') {
                        if (a.type === 'img' && b.type !== a.type) return -1;
                        else if (a.type !== 'img' && b.type !== 'img') {
                            if (a.type === 'video' && b.type !== 'video') return -1;
                            else return 1;
                        }
                    }
                    return 1;
                });
                if (stageMode === 'public') {
                    if(newDirectory === false && pageNumber !== 0){
                        setPublicFileList(prevData => [...prevData, ...tmpList]);
                    }
                    else{
                        setPublicFileList(tmpList);
                    }
                }
                else {
                    if(newDirectory === false && pageNumber !== 0){
                        for(const idx in tmpList){
                            setPrivateFileList(prevData => [...prevData, tmpList[idx]]);
                        }
                    }
                    setPrivateFileList(tmpList);
                }
            }
            if(list.data.length < 20){
                setMoreInfoVisible(false);
            }
            else{
                setMoreInfoVisible(true);
            }
        }
        setDirLoading(false);
    }

    function itemClick(uuid: string, type: string, path: string, name: string) {
        if (type === 'dir') {
            var link = path + underBar;
            setLocation(link);
        }
        else {
            setSelectFileType(type);
            setSelectFileName(name);
            setFileUUID(uuid);
            setImageModalVisible(true);
        }
    }

    function itemSelect(uuid: string, name: string, type: string) {
        if (type === 'up') {
            setErrorMessage("위로 가기는 선택 할 수 없습니다.");
            setErrorToast(true);
        }
        else {
            let object = {
                uuid: uuid,
                path: location,
                name: name,
                type: type,
                size: 0
            }
            if (selectedFileList.findIndex(e => e.uuid === uuid) !== -1) {
                setSelectFileList(selectedFileList.filter(e => e.uuid !== uuid))
            }
            else {
                setSelectFileList(selectedFileList => [...selectedFileList, object])
            }
        }
    }

    async function DownloadFile() {
        if (selectedFileList.length <= 0) {
            setErrorMessage("선택한 파일이 없습니다.");
            setErrorToast(true);
        }
        else {
            var dirCheck = true;
            for (var idx in selectedFileList) {
                if (selectedFileList[idx].type === 'dir') {
                    dirCheck = false;
                    break;
                }
            }
            if (dirCheck) {
                var tmpUrl = '';
                if (stageMode == 'public') {
                    tmpUrl = '/file/downloadPublicFile';
                }
                else {
                    tmpUrl = '/file/downloadPrivateFile';
                }
                for (var idx in selectedFileList) {
                    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
                    console.log("Downloading file access token :" + accessToken);
                    if (accessToken !== null) {
                        await axios({
                            headers: { 'Authorization': accessToken },
                            method: 'POST',
                            url: tmpUrl,
                            responseType: 'blob',  // Set the response type to 'blob' to handle binary data
                            data: {
                                path: '',
                                name: 'download',
                                uuidName: selectedFileList[idx].uuid,
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
                                link.setAttribute('download', selectedFileList[idx].name); // Set the desired filename and extension
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            })
                            .catch((error) => {
                                console.error('Error downloading file:', error);
                            });
                        setDownloadMode(false);
                        setSelectFileList([]);
                    }
                }
            }
            else {
                setErrorMessage("폴더는 다운로드 받을 수 없습니다.");
                setErrorToast(true);
            }
        }
    }

    function MoveModalVisible() {
        if (selectedFileList.length <= 0) {
            setErrorMessage("선택한 파일이 없습니다.");
            setErrorToast(true);
        }
        else {
            setMoveModalVisible(true);
        }
    }

    const clickMoveUp = () => {
        if (stageMode === 'private' && location === defaultPrivateLocation + underBar + userId + underBar) {
            setErrorToast(true);
            setErrorMessage('이미 최상단 폴더입니다.');
        }
        else if (stageMode === 'public' && location === defaultPublicLocation) {
            setErrorToast(true);
            setErrorMessage('이미 최상단 폴더입니다.');
        }
        else {
            var locationSplit: string[] = location.split('__');
            var link = '';
            for (var i = 0; i < locationSplit.length - 2; i++) {
                link += locationSplit[i] + underBar;
            }
            setLocation(link);
        }
    }
    const clickImageModal = () => {
        setImageModalVisible(!imageModalVisible);
        return imageModalVisible;
    };
    const clickMkdirModal = () => {
        setMkdirModalVisible(!mkdirModalVisible);
        const tmpPageNum = pageNumber;
        getFileList(true);
            for(let i = 1; i < tmpPageNum; i++) {
                getFileList(false);
            }
        return mkdirModalVisible;
    };
    const clickUploadModal = () => {
        setUploadModalVisible(!uploadModalVisible);
        const tmpPageNum = pageNumber;
        getFileList(true);
            for(let i = 1; i < tmpPageNum; i++) {
                getFileList(false);
            }
        return uploadModalVisible;
    };
    const clickMoveModal = (result: boolean) => {
        setMoveModalVisible(!moveModalVisible);
        if (result) {
            const tmpPageNum = pageNumber;
            getFileList(true);
            for(let i = 1; i < tmpPageNum; i++) {
                getFileList(false);
            }
        }
        return moveModalVisible;
    }

    const removeFile = async () => {
        if (selectedFileList.length <= 0) {
            setErrorMessage("선택한 파일이 없습니다.");
            setErrorToast(true);
        }
        else {
            const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
            if (accessToken !== null) {
                if (stageMode === 'public') {
                    for (var idx in selectedFileList) {
                        // await axios.request({
                        //     headers: {'Authorization': accessToken},
                        //     url: '/file/deletePublicFileToTrash/?uuid='+selectedFileList[idx].uuid,
                        //     method: 'DELETE',
                        // });
                        await sendToSpring('/file/deletePublicFileToTrash/?uuid=' + selectedFileList[idx].uuid, 'DELETE', '', '');
                    }
                    getFileList(true);
                }
                else {
                    for (var idx in selectedFileList) {
                        // await axios.request({
                        //     headers: {'Authorization': accessToken},
                        //     url: '/file/deletePrivateFileToTrash/',
                        //     method: 'DELETE',
                        //     params:{
                        //         uuid: selectedFileList[idx].uuid,
                        //         accessToken: accessToken,
                        //     }
                        // });
                        var params = {
                            uuid: selectedFileList[idx].uuid,
                            accessToken: accessToken,
                        }
                        await sendToSpring('/file/deletePrivateFileToTrash/', 'DELETE', '', params);
                    }
                    getFileList(true);

                }
            }
            else {
                setErrorMessage("유저 정보가 없습니다. 다시 로그인 해주세요.");
                setErrorToast(true);
            }

            setDownloadMode(false);
            setSelectFileList([]);
        }
    };

    const clickDownloadMoreFileInfo = async() => {
        setPageNumber(pageNumber + 1);
    }

    useEffect(() => {
        setNowPath("최상위폴더");
        if (stageMode === 'public') {
            setLocation(defaultPublicLocation);
        }
        else {
            setLocation(defaultPrivateLocation + userId + underBar);
        }
    }, [stageMode]);

    useEffect(() => {
        if(pageNumber === 0) {
            getFileList(true);
        }
        else{
            setPageNumber(0);
        }
        if(stageMode === 'public') {setNowPath(location === defaultPublicLocation ? '최상위 폴더' : location.replace(defaultPublicLocation, '').replaceAll(underBar, ' > '))}
        else { setNowPath(location === defaultPrivateLocation ? '최상위 폴더' : location.replace(defaultPrivateLocation, '').replaceAll(underBar, ' > '))}
        dispatch(setNowPathStatic(location));
    }, [location]);

    useEffect(() => {
        if (stageMode === 'public') {
            getFileList(false);
        }
        else {
            var path = location.split(defaultPrivateLocation)[1];
            path = path.split(underBar + userId + underBar)[1].replaceAll(underBar, ' > ');
            if (path !== '') setNowPath(path);
            getFileList(false);
        }
    },[pageNumber]);
      
    return (
        <div className='cloud-scroll'>
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={errorToast} onClose={() => { setErrorToast(false) }} delay={3000} autohide={true}>
                    <Toast.Header>
                        <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
                        <strong className="me-auto">권한 에러</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <ImageModal click={clickImageModal} status={imageModalVisible} info={fileUUID} mode={stageMode} type={selectFileType} name={selectFileName} />
            <UploadModal click={clickUploadModal} status={uploadModalVisible} mode={stageMode} path={place} location={location} />
            <MkdirModal click={clickMkdirModal} status={mkdirModalVisible} mode={stageMode} path={location} fileList={stageMode === 'public' ? publicFileList : privateFileList} />
           
            {/* <MoveFileModal click={(result: boolean) => clickMoveModal(result)} status={moveModalVisible} mode={stageMode} location={location} selectedFileList={selectedFileList} /> */}
            <div className='content'>
                <br />
                <h1>Cloud</h1>
                <p><strong>현재 폴더 위치</strong> : {nowPath} </p>
                <Stack direction="horizontal" style={{ marginBottom: '1rem'}}>
                    <Button className='btn-content' variant='outline-primary' style={{ marginRight: '1rem' }} onClick={clickMoveUp}>위로가기</Button>
                    <Button className='btn-content' variant="primary" style={{ marginRight: '1rem' }} onClick={() => { setUploadModalVisible(true) }}>업로드</Button>
                    <Button className='btn-content' variant="secondary" style={{ marginRight: '1rem' }} onClick={() => { setMkdirModalVisible(true) }}>새 폴더</Button>
                    {!downloadMode && (
                        <div>
                            <Button className='btn-content' variant="success" onClick={() => { setDownloadMode(true) }}>선택모드</Button>
                        </div>
                    )}
                    {downloadMode && (
                        <div>
                            <Button className='btn-content' variant="success" style={{ marginRight: '1rem' }} onClick={DownloadFile}>다운로드</Button>
                            <Button className='btn-content' variant="success" style={{ marginRight: '1rem' }} onClick={MoveModalVisible}>이동</Button>
                            <Button className='btn-content' variant="danger" style={{ marginRight: '1rem' }} onClick={removeFile}>삭제</Button>
                            <Button className='btn-content' variant="warning" onClick={() => {
                                setDownloadMode(false);
                                setSelectFileList([]);
                            }}>취소</Button>
                        </div>
                    )}
                </Stack>
                <div style={{overflowY:'scroll', overflowX:'hidden'}}>
                    <div style={{height:'65vh'}}>
                        <Tabs defaultActiveKey='public' fill activeKey={stageMode} onSelect={(k) => {
                            if (typeof (k) === 'string') {
                                setStageMode(k);
                            }
                        }} >
                            <Tab eventKey='public' title='Public'>
                                {dirLoading ? (
                                    <div style={{justifyContent:'center', display:'flex', marginTop:'20vh'}}>
                                        <Loading showText={true}/>
                                    </div>
                                ) : (
                                    <div style={{justifyContent:'center', display:'flex'}}>
                                        <Row className='g-4' xs={1} sm={2} md={4} lg={6} style={{justifyContent:'center', display:'flex'}}>
                                            {publicFileList.length !== 0 && (
                                                Array.from({ length: publicFileList.length }).map((_, index: number) => (
                                                    <Col key={publicFileList[index].uuid} style={{ padding: '2vh', width: '12rem' }} >
                                                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                                                            <div
                                                                className={`cardDiv ${selectedFileList.findIndex(e => e.uuid === publicFileList[index].uuid) !== -1 ? 'border rounded-3 border-primary border-2' : ''}`}
                                                                onClick={(key) => { !downloadMode ? itemClick(publicFileList[index].uuid, publicFileList[index].type, publicFileList[index].path, publicFileList[index].name) : itemSelect(publicFileList[index].uuid, publicFileList[index].name, publicFileList[index].type) }}>
                                                                <CardCloud uuid={publicFileList[index].uuid} name={publicFileList[index].name} type={publicFileList[index].type} path={publicFileList[index].path} mode={'public'} />
                                                            </div>
                                                        </motion.div>
                                                    </Col>
                                                ))
                                            )}
                                            {publicFileList.length === 0 && (
                                                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                                                    <Image
                                                        alt="none file"
                                                        src={NoneFileIcon}
                                                        priority={true}
                                                    />
                                                    <p className='text-center text-secondary' style={{ fontSize: '3rem' }}>폴더가 비어있습니다.</p>
                                                </div>
                                            )}
                                        </Row>
                                    </div>
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
                                                <Col key={privateFileList[index].path}>
                                                    <Container style={{ padding: '2vh', width: '12rem' }}>
                                                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                                                            <div
                                                                className={`cardDiv ${selectedFileList.findIndex(e => e.uuid === privateFileList[index].uuid) !== -1 ? 'border rounded-3 border-primary border-2' : ''}`}
                                                                onClick={(key) => { !downloadMode ? itemClick(privateFileList[index].uuid, privateFileList[index].type, privateFileList[index].path, privateFileList[index].name) : itemSelect(privateFileList[index].uuid, privateFileList[index].name, privateFileList[index].type) }}>
                                                                <CardCloud uuid={privateFileList[index].uuid} name={privateFileList[index].name} type={privateFileList[index].type} path={privateFileList[index].path} mode={'private'} />
                                                            </div>
                                                        </motion.div>
                                                    </Container>
                                                </Col>
                                            ))
                                        )}
                                        {privateFileList.length === 0 && (
                                            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                                                <Image
                                                    alt="none file"
                                                    src={NoneFileIcon}
                                                    priority={true}
                                                />
                                                <p className='text-center text-secondary' style={{ fontSize: '3rem' }}>폴더가 비어있습니다.</p>
                                            </div>
                                        )}
                                    </Row>
                                )}
                                
                            </Tab>
                        </Tabs>
                        {publicFileList.length > 0 &&  moreInfoVisible === true &&(
                            <div style={{justifyContent:'center', display:'flex', marginTop:'10vh', marginBottom:'10vh'}}>
                                <Button variant='outline-dark' size='sm' style={{ width:'10rem', height:'10rem'}}>
                                    <Image
                                    src={DownloadIcon}
                                    alt="download"
                                    width={0}
                                    height={0}
                                    style={{ width:'9rem', height:'9rem'}}
                                    onClick={clickDownloadMoreFileInfo}
                                    priority={true}
                                    />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                
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
        </div>
    )
}
