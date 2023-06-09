import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ReactPlayer from "react-player";
import Image from 'next/image';
import axios from 'axios';

import FileIcon from '/public/image/icon/file.png';
import { Col, Container, Form, Row } from 'react-bootstrap';

type ModalProps = {
    click: () => boolean;
    status: boolean;
    mode: string;
    path: string;
    location: string;
}
interface previewInterface {
    target: string;
    type: string;
    name: string;
}
export default function ImageModal({ click, status, mode, path, location }: ModalProps): JSX.Element {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<previewInterface[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newImages = [...images];
        const newPreviews = [...previews];

        for (let i = 0; i < e.target.files!.length; i++) {
            const file = e.target.files![i];
            // 이벤트객체의 파일을 newImages에 담기
            newImages.push(file);
            // 파일리더 객체 생성
            const reader = new FileReader();
            // 파일 읽어온 후 실행되는 콜백함수
            reader.onload = (e) => {
                // 읽어온 값을 갱신하기
                if(file.type.includes('image')){
                    let obj = {
                        target: e.target?.result as string,
                        type: 'image',
                        name: file.name,
                    }
                    newPreviews.push(obj);
                }
                else{
                    let obj = {
                        target: 'imageLogo',
                        type: 'file',
                        name: file.name,
                    }
                    newPreviews.push(obj);
                }
                setPreviews(newPreviews);
                
            };
            // 파일 객체를 읽어 base64 형태의 문자열로 변환
            reader.readAsDataURL(file);
        }
        setImages(newImages);
    };

    const handleDeletePreview = (index: number) => {
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const UploadFiles = async() => {
        const formData = new FormData();
        const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        const link = mode === 'public' ? 'uploadPublicFile' : 'uploadPrivateFile/'+token;
        for( var index in images) {
            formData.append('uploadFile', images[index]);
        }
        if(mode === 'public') formData.append('path', path.split(location)[1]);
        else formData.append('path', path);
        try{
            const res = await axios.request({
                headers: {
                    'Content-Type':'multipart/form-data',
                },
                url: '/file/'+link,
                method: 'POST',
                data: formData
            })
            setImages([]);
            setPreviews([]);
            click();
        }
        catch(e) {
            console.error(e);
        }
    }
    return (
        <div>
            <Modal show={status} onHide={() =>{
                        setImages([]);
                        setPreviews([]);
                        click();
                    }} aria-labelledby="contained-modal-title-vcenter" centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{'파일업로드'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType='multipart/form-data'>
                        <Form.Group>
                            <Form.Label htmlFor='file'><strong>{mode === 'public' ? '공용폴더' : '개인폴더'} 파일업로드</strong></Form.Label>
                        </Form.Group>
                        <Form.Label htmlFor='file'>파일업로드 위치 : {location}</Form.Label>
                        <Form.Control type="file" id='file' multiple onChange={handleImageChange} />
                    </Form>
                    <Row style={{ marginTop: '1rem' }}>
                        {previews?.map((preview, index) => (
                            <Col key={index}>
                                <Container style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                                    {preview.type === 'image' && (
                                        <div>
                                            <Image
                                                src={preview.target}
                                                alt="preview image"
                                                width={150}
                                                height={150}
                                                loading='lazy'
                                            />
                                            <p className='text-center'>{preview.name}</p>
                                            <Button onClick={() => handleDeletePreview(index)} style={{width:'100%'}}>X</Button>
                                        </div>
                                    )}
                                     {preview.type === 'file' && (
                                        <div >
                                            <Image
                                                src={FileIcon}
                                                alt="preview image"
                                                width={150}
                                                height={150}
                                                loading='lazy'
                                            />
                                            <p className='text-center'>{preview.name}</p>
                                            <Button onClick={() => handleDeletePreview(index)} style={{width:'100%'}}>X</Button>
                                        </div>
                                    )}
                                </Container>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() =>{
                        setImages([]);
                        setPreviews([]);
                        click();
                    }}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={UploadFiles}>
                        업로드
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}