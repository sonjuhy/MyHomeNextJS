import axios from "axios";

const METHOD_URL = '/auth/reissueAccessToken/';

export default async function accessTokenIssue(token:string) {
    var validate = false;

    // const data = await getData(token);
    const data = await axios.request({
        url: process.env.BASE_URL+METHOD_URL+token,
        method: 'GET',
    });
    if(data.status === 200){
        var result = data.data;
        if(Object.keys(result).includes('error')){
            console.log(result);
        }
        else{
            sessionStorage.setItem('accessToken', result.accessToken);
        }
    }
}