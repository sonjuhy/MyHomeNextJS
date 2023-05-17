import AuthValidate from '@/modules/authValidate/authValidate'
import NavBar from '@/components/navbar/NavBar';
import GetUserInfo from '@/modules/getUserInfo/getUserInfo';
import styles from "./index.module.css";
import CardLight from "@/components/card/LightMainCard";
import CardNotice from "@/components/card/NoticeCard";
import CardWeather from '@/components/card/WeatherCard';

import LogoColor from '/public/image/icon/MyhomeIcon.png';
import UserIcon from '/public/image/icon/user-white.png';
import SettingIcon from '/public/image/icon/setting-white.png';

import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Stack, Toast, ToastContainer } from 'react-bootstrap';
import Link from 'next/link';



export default function Main() {
    const [userName, setUserName] = useState('');
    const [visible, setVisible] = useState(true);
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();
    const theme = 'dark';

    async function userPermissionCheck() {
        const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        if (accessToken !== null) {
            AuthValidate(accessToken)
                .then(() => {
                    console.log("Auth is validated");
                    setVisible(true);
                    GetUserInfo(accessToken)
                        .then((name) => {
                            setUserName(name);
                        })
                        .catch();
                })
                .catch(() => {
                    console.log("Auth is not validated");
                    setErrorMessage('접근권한이 없습니다. 회원가입 이후 이용가능합니다.');
                    setErrorToast(true);
                    router.push('/', undefined, { shallow: true });
                });
        }
        else {
            console.log("Token is null");
            setErrorMessage('접근권한이 없습니다. 회원가입 이후 이용가능합니다.');
            setErrorToast(true);
            // router.push('/', undefined, {shallow: true});
        }
    }

    useEffect(() => {
        // userPermissionCheck();
    }, []);
    return (
        <>
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={errorToast} onClose={() => { setErrorToast(false) }} delay={4000} autohide={true}>
                    <Toast.Header>
                        <Image alt='logo' src={LogoColor} className="rounded me-2" width={20} height={20} />
                        <strong className="me-auto">권한 에러</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <NavBar back={theme} mode={theme} sign={true} />
            {visible && (
                <div>
                    <div className={`${styles.sidebar} text-center`}>
                        <div>
                            <Image alt='userIcon' src={UserIcon} className="rounded me-2" width={60} height={60} />
                            <p style={{color: 'white'}}>{`${userName}`} 님</p>
                            <Link href="/setting">
                                <Image alt='settingIcon' src={SettingIcon} className="rounded me-2" width={40} height={40} />
                                설정
                            </Link>
                        </div>
                        
                        <Link href="/">Home</Link>
                        <Link href="/light">Light</Link>
                        <Link href="/weather">Weather</Link>
                        <Link href="/cloud">Cloud</Link>
                    </div>
                    <div className={`${styles.content}`}>
                        <br/>
                        <h1>Notice</h1>
                        <CardNotice/>
                        <h1>Weather</h1>
                        <CardWeather/>
                        <h1>Light Control</h1>
                        <CardLight/>
                        <h1></h1>
                    </div>
                </div>
            )}
        </>
    )
}