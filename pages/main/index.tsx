import AuthValidate from '@/modules/authValidate/authValidate'
import NavBar from '@/components/navbar/NavBar';
import GetUserInfo from '@/modules/getUserInfo/getUserInfo';
import styles from "./index.module.css";
import MainPage from '@/components/pageComponents/main/mainPage';
import NoticePage from '@/components/pageComponents/notice/noticePage';
import CloudPage from '@/components/pageComponents/cloud/cloudPage';
import CloudTrashPage from '@/components/pageComponents/cloud/cloudTrashPage';

import LogoColor from '/public/image/icon/MyhomeIcon.png';
import UserIcon from '/public/image/icon/user-white.png';
import SettingIcon from '/public/image/icon/setting-white.png';

import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import Link from 'next/link';

interface User {
    userId: number;
    id: string;
    name: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    auth: string;
}

export default function Main() {
    const [userName, setUserName] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [category, setCategory] = useState('home');

    const router = useRouter();
    const theme = 'dark';

    function selectedCategory(selected: string) {
        setCategory(selected);
    }
    async function userPermissionCheck() {
        const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        if (accessToken !== null) {
            AuthValidate()
                .then(() => {
                    console.log("Auth is validated");
                    setVisible(true);
                    GetUserInfo(accessToken)
                        .then((data: User) => {
                            setUserName(data.name);
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
            router.push('/', undefined, {shallow: true});
        }
    }

    useEffect(() => {
        userPermissionCheck();
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
                        
                        <div className={category === 'home' ?`${styles.selectedMenu}` : `${styles.sidebarMenu}`} onClick={()=>{setCategory('home')}}>Home</div>
                        <div className={category === 'light' ?`${styles.selectedMenu}` : `${styles.sidebarMenu}`} onClick={()=>{setCategory('light')}}>Light</div>
                        <div className={category === 'weather' ?`${styles.selectedMenu}` : `${styles.sidebarMenu}`} onClick={()=>{setCategory('weather')}}>Weather</div>
                        <div className={category === 'cloud' ?`${styles.selectedMenu}` : `${styles.sidebarMenu}`} onClick={()=>{setCategory('cloud')}}>Cloud</div>
                        {(category === 'cloud' || category === 'cloudTrash') && (
                            <div className={`${styles.selectedSubMenu}`} onClick={()=>{setCategory("cloudTrash")}}>Cloud Trash</div>
                        )}
                    </div>
                    <div>
                        {category === 'home' && (
                            <MainPage selectMenu={selectedCategory}/>
                        )}
                        {category === 'light' && (
                            <div>Light</div>
                        )}
                        {category === 'weather' && (
                            <div>Weather</div>
                        )}
                        {category === 'cloud' && (
                            <CloudPage/>
                        )}
                        {category === 'cloudTrash' && (
                            <CloudTrashPage/>
                        )}
                        {category === 'notice' && (
                            <NoticePage/>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}