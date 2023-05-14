import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BASE_URL = 'http://localhost:8080/';

export default function form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmail(element: React.ChangeEvent<HTMLInputElement>){
        setEmail(element.target.value);
    }

    function handlePassword(element: React.ChangeEvent<HTMLInputElement>){
        setPassword(element.target.value);
    }

    async function signIn(){
        const data = await axios.request({
            url: BASE_URL,
            method: 'POST',
            data:{
                id: email,
                password: password
            }
        })
        console.log(data.status);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
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
                <Button variant="success" type="submit" onClick={() =>{
                    console.log("Success!");
                    console.log(email);
                    console.log(password);
                }}>
                    Log In
                </Button>
            </div>
            <br/>
            <p className='text-center'>Don't have a account? <Link href='/signup'>Sign Up</Link></p>
        </Form>
    )
}