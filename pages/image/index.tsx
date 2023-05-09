import LoadImage from '@/components/image/ImageCard';
import NavBar from '@/components/navbar/NavBar';

import {Container, Row} from 'react-bootstrap'

export default function Main(): JSX.Element {

    return (
        <div>
            <NavBar back="light" mode="light"/>
            <Container>
                <div>this is image page</div>
                <Row>
                    <LoadImage />
                    <LoadImage />
                    <LoadImage />
                    {/* <Image url=''/> */}
                </Row>
            </Container>
        </div>
    );
}