import axios from 'axios';
import { useState } from 'react';

export default async function GetUserInfo(token: string): Promise<string> {
    const data = await axios.request({
        url: process.env.BASE_URL+"/auth/getUserInfo/"+token,
        method: "GET",
    })
    if(data.status === 200) {
        var userInfo = data.data;
        return Promise.resolve(userInfo.name);
    }
    else{
        throw new Error('error');
    }
}