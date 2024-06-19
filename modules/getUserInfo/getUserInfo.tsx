import axios from 'axios';
import { useState } from 'react';
import sendToSpring from '../sendToSpring/sendToSpring';

interface User {
    userId: number;
    id: string;
    name: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    auth: string;
}

export default async function GetUserInfo(token: string): Promise<User> {
    const response = await sendToSpring('/auth/getUserInfo/'+token, 'GET','','');
    if(response.result === 200) {
        var userInfo:any = response.data;
        return Promise.resolve(userInfo);
    }
    else{
        throw new Error('error');
    }
}