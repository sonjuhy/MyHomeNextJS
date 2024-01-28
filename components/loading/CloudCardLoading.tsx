import React from 'react';
import {Background, LoadingText} from './Styles'

import Image from 'next/image'

import Spinner from 'react-bootstrap/Spinner';

export const Loading = () => {
    return <div>
        <Background>
            <Spinner animation='border' variant='info'/>
        </Background>
        </div>
};
export default Loading;