import FormModel from '@/components/form/SignInForm';
import Logo from '/public/image/icon/MyHomeIcon-white.png';
import BackgroundImage from '/public/image/img/background.jpg';

import Image from 'next/image';
import { Container } from 'react-bootstrap';
import NavBar from '@/components/navbar/NavBar';

export default function SignIn() {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundImage: `url(${BackgroundImage.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            }}>
            <NavBar back={'Transition'} mode={'dark'}/>
            <div className='d-flex justify-content-center align-items-center container-main'>
                <div>
                    <Container>
                        <div className='d-flex justify-content-center '>
                            <Image
                            alt='Logo'
                            src={Logo}
                            width="135"
                            height="135"
                        
                            />
                        </div>
                        <FormModel />
                    </Container>
                </div>
                <style jsx>{`
                    .container-main{
                        height:80%;
                    }
                `}</style>
            </div>
        </div>
    )
}