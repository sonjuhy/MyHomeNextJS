import FormModel from '@/components/form/SignUpForm';
import LogoWhite from '/public/image/icon/MyHomeIcon-white.png';
import LogoColor from '/public/image/icon/MyhomeIcon.png';
import BackgroundImage from '/public/image/img/background.jpg';

import Image from 'next/image';
import { Button, Container, Modal, Toast, ToastContainer } from 'react-bootstrap';
import NavBar from '@/components/navbar/NavBar';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [modal, setModal] = useState(false);
    
    async function signUp(name: string, id: string, password: string){
        
        const data = await axios.request({
            url: process.env.BASE_URL+'/auth/signUp',
            method: 'POST',
            data:{
                userId: 0,
                name: name,
                id: id,
                password: password,
                accessToken: '',
                refreshToken: '',
                auth: ''
            }
        })
        if(data.status === 200){
            var result = data.data;
            if(Object.keys(result).includes('error')){
                var error_log = result.error;
                if(error_log === 'already exist user'){
                    setErrorMessage('이미 존재하는 계정입니다.');
                }
                else{
                    setErrorMessage('회원가입 과정에서 문제가 있습니다. 다시 시도해주세요.');
                }
                setErrorToast(true);
            }
            else{
                setModal(true);
            }
        }
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundImage: `url(${BackgroundImage.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            }}>
            <NavBar back={'Transition'} mode={'dark'} sign={false}/>
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={errorToast} onClose={() => {setErrorToast(false)}} delay={2000} autohide={true}>
                    <Toast.Header>
                        <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
                        <strong className="me-auto">회원가입 에러</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입을 축하합니다!</Modal.Title>
                </Modal.Header>
                <Modal.Body>회원가입이 성공적으로 됐습니다. 정회원 등록 후 사용해주세요.</Modal.Body>
                <Modal.Footer>
                    <Link href="/">
                        <Button variant="primary" onClick={()=>{setModal(false)}}>
                            메인으로 이동
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
            <div className='d-flex justify-content-center align-items-center container-main'>
                <div>
                    <Container>
                        <div className='d-flex justify-content-center '>
                            <Image
                            alt='Logo'
                            src={LogoWhite}
                            width="135"
                            height="135"
                            priority
                            />
                        </div>
                        <FormModel signUp={signUp}/>
                    </Container>
                </div>
                <style jsx>{`
                    .container-main{
                        height:80%;
                    }
                `}</style>
            </div>
        </div>
    )
}