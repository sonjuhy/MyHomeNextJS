import sendToSpring from "../sendToSpring/sendToSpring";

import IssueAccessToken from '@/modules/tokenIssue/accessTokenIssue';

const METHOD_URL = '/auth/validateAuth/';

export default async function Validate():Promise<boolean> {
    var validate = false;
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    if(token !== null){
        const response = await sendToSpring(METHOD_URL+token, "GET", '', '');
        if(response.result === 200){
            var result:any = response.data;
            validate = result.authValidate;
            if(Object.keys(validate).includes('error')){
                IssueAccessToken(token);
            }
            else if(!result.accessTokenValidate){
                sessionStorage.setItem('accessToken', result.newAccessToken);
                validate = true;
            }
        }
    }
    if(validate){
        return Promise.resolve(validate);
    }
    else{
        throw new Error('validate failed');
    }
    
}