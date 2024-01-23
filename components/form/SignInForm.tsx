import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type propsForm = {
    signIn: Function
}
export default function SignInForm({signIn} : propsForm) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmail(element: React.ChangeEvent<HTMLInputElement>){
        setEmail(element.target.value);
    }

    function handlePassword(element: React.ChangeEvent<HTMLInputElement>){
        setPassword(element.target.value);
    }

    

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
                <Form.Text className="text-muted">
                    We`&apos;`ll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
                <Form.Text className="text-muted">
                If you forgot password, Ask to admin.
                </Form.Text>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="success" onClick={() =>{
                    signIn(email, password);
                }}>
                    Log In
                </Button>
            </div>
            <br/>
            <p className='text-center'>Don`&apos;`t have an account? <Link href='/signup'>Sign Up</Link></p>
        </Form>
    )
}