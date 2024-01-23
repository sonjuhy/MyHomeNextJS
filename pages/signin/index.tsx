import FormModel from '@/components/form/SignInForm';
import Logo from '/public/image/icon/MyHomeIcon-white.png';
import LogoColor from '/public/image/icon/MyhomeIcon.png';
import BackgroundImage from '/public/image/img/background.jpg';

import Image from 'next/image';
import {useRouter} from 'next/router';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import NavBar from '@/components/navbar/NavBar';
import axios from 'axios';
import { useState } from 'react';


export default function SignIn() {
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    async function signIn(email: string, password: string){
        console.log('signing in : ' + email);
        const data = await axios.request({
            url: '/auth/signIn',
            method: 'POST',
            data:{
                // userId: 0,
                // id: email,
                // name: '',
                // password: password,
                // accessToken: '',
                // refreshToken: '',
                // auth: ''
                id: email,
                password: password
            }
        })
        if(data.status === 200){
            var result = data.data;
            if(Object.keys(result).includes('error')){
                var error_log = result.error;
                if(error_log === 'this Id is not user'){
                    setErrorMessage('계정 정보가 올바르지 않습니다.');
                }
                else{
                    setErrorMessage('로그인 과정에서 문제가 있습니다. 다시 시도해주세요.');
                }
                setErrorToast(true);
            }
            else {
                sessionStorage.setItem('accessToken', result.accessToken);
                router.push('/');
            }
        }
        else{
            setErrorMessage('로그인 과정에서 문제가 있습니다. 다시 시도해주세요.');
            setErrorToast(true);
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
                        <strong className="me-auto">로그인 에러</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className='d-flex justify-content-center align-items-center container-main'>
                <div>
                    <Container>
                        <div className='d-flex justify-content-center '>
                            <Image
                            alt='Logo'
                            src={Logo}
                            width="135"
                            height="135"
                        
                            />
                        </div>
                        <FormModel signIn={signIn}/>
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