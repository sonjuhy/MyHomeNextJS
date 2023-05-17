import axios from "axios";

import IssueAccessToken from '@/modules/tokenIssue/accessTokenIssue';

const METHOD_URL = '/auth/validateAuth/';

export default async function Validate(token:string):Promise<boolean> {
    var validate = false;

    // const data = await getData(token);
    const data = await axios.request({
        url: process.env.BASE_URL+METHOD_URL+token,
        method: 'GET',
    });
    if(data.status === 200){
        var result = data.data;
        validate = result.authValidate;
        if(Object.keys(validate).includes('error')){
            IssueAccessToken(token);
        }
        else if(!result.accessTokenValidate){
            sessionStorage.setItem('accessToken', result.newAccessToken);
        }
    }
    if(validate){
        return Promise.resolve(validate);
    }
    else{
        throw new Error('validate failed');
    }
    
}