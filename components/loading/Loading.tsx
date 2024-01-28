import React from 'react';
import {Background, LoadingText} from './Styles'

import Image from 'next/image'

import Spinner from  '@/public/image/img/spinner.gif'
type props = {
    showText: boolean;
}
export const Loading = ({showText}:props) => {
    return <div>
        <Background>
            {showText && (
                <LoadingText>잠시만 기다려 주세요.</LoadingText>
            )}
            <Image 
            src={Spinner} 
            alt={'loading spinner'}
            width={0}
            height={0}
            style={{width: '8rem', height: '8rem'}}
            loading='eager'
            />
        </Background>
        </div>
};
export default Loading;