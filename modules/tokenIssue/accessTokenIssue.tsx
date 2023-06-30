import sendToSpring from "../sendToSpring/sendToSpring";

const METHOD_URL = '/auth/reissueAccessToken/';

export default async function accessTokenIssue(token:string) {
    const response = await sendToSpring(METHOD_URL+token, 'GET', '', '');
    if(response.result === 200){
        var result:any = response.data;
        if(Object.keys(result).includes('error')){
            console.log(result);
        }
        else{
            sessionStorage.setItem('accessToken', result.accessToken);
        }
    }
}