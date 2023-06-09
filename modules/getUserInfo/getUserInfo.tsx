import axios from 'axios';
import { useState } from 'react';

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
    const data = await axios.request({
        url: process.env.BASE_URL+"/auth/getUserInfo/"+token,
        method: "GET",
    })
    if(data.status === 200) {
        var userInfo = data.data;
        return Promise.resolve(userInfo);
    }
    else{
        throw new Error('error');
    }
}