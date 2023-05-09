import {Button, Container, Stack} from "react-bootstrap"

export default function Footer() : JSX.Element{

    return (
    <div className="footer-background">
        <Container>
            <div className="d-flex justify-content-center">
                <Stack gap={2} className="mt-4">
                    <h4 className="footer-text text-center">Footer TEXT</h4>
                    <h6 className="footer-text text-center">Footer Sub TEXT</h6>
                </Stack>
            </div>
        </Container>
        <style jsx>
            {`
                .footer-background{
                    background: #323e58;
                    height: 15vh;
                }
                .footer-text{
                    color: #dfdedc;
                }
            `}
        </style>
    </div>
    )
}