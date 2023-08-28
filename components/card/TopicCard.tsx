import Image from "next/image";

import { Card, Button } from 'react-bootstrap';

type cardProps = {
    title: string;
    content: string;
    imgSrc: string;
}
type Props = {
    src: string;
}

export default function TopicCard({ title, content, imgSrc }: cardProps): JSX.Element {
    // console.log(imgSrc);
    return (
        <Card style={{ width: '20rem' }} className="mb-4">
            <Image
                alt="topic card image"
                loader={imageLoader}
                src={imgSrc}
                width={100}
                height={100}
                loading="lazy"
                // fill={true}
                // sizes="responsive"
                layout="responsive"
            />
            <Card.Body>
                <Card.Title style={{color: '#5c201e'}}>{title}</Card.Title>
                <Card.Text style={{color: '#060509'}}>
                    {content}
                    Some quick example text to build on the card title and make up the
                    bulk of the card`&apos;`s content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}
const imageLoader = ({src}:Props) =>{
    return src;
  }