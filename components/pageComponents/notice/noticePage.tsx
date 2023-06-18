import CardNotice from "@/components/card/NoticeCard";
import CardAddNotice from '@/components/card/NoticeAddCard';
import CardNoticeList from '@/components/pageComponents/notice/noticeList';

import GetUserInfo from '@/modules/getUserInfo/getUserInfo';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
    const router = useRouter();

    const refreshPage = () => {    
        // router.reload();
    };
    useEffect(() => {
        const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
        if (accessToken !== null) {
            GetUserInfo(accessToken)
                .then((data: User) => {
                    setUserName(data.name);
                })
                .catch();
        }
    },[]);

    return (
        <>
            <div className='content'>
                <br/>
                <h1>TOP Notice</h1>
                <div className='text-decoration-none' style={{color:'black'}}>
                    <CardNotice/>
                </div>
                <h1>ADD Notice</h1>
                <CardAddNotice user={userName} addNoticeRefresh={refreshPage}/>
                <br/>
                <h1>Notice List</h1>
                <CardNoticeList user={userName}/>
            </div>
            <style jsx>{`
            .content {
                margin-left: 12vw;
                padding: 1px 16px;
            }
            `}</style>
        </>
    )
}