import Image from "next/image";
import {useRouter} from 'next/router';
import {Button, Row} from "react-bootstrap";

import NavBar from '@/components/navbar/NavBar'

import BannerImage from '/public/image/img/banner.jpg'

type propsBanner = {
    sign: boolean;
}
 export default function Banner({sign}:propsBanner) {
    const router = useRouter();

    return <div className='banner-background'>
        <NavBar back="Transition" mode="dark" sign={sign}></NavBar>
        <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center container-main">
                <Row>
                    <h1 className="text-main text-center">Main Page</h1>
                    <Button type="button" className="btn btn-primary m-1" onClick={() => router.push('/signin')}>SIGN IN</Button>
                    <Button type="button" className="btn btn-success m-1" onClick={() => router.push('/signup')}>SIGN UP</Button>
                </Row>
            </div>
        </div>
        <Image
          src={BannerImage}
          alt="메인 배경 이미지"
          fill
          loading="lazy"
          objectFit="cover"
          objectPosition="center"
        />
        <style jsx>{`
            .banner-background {
                position: relative;
                min-height: 100vh;
            }
            .container-main{
                top: 40vh;
                z-index: 1;
                position: absolute;
            }
            .button-main {
                margin:5vw;
            }
            .text-main {
                color: white;
            }
        `}</style>
    </div>
}