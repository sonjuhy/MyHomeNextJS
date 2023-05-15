import Link from "next/link";
import { FC, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";


interface User {
    name: string;
    id: string;
    password: string;
}

type propsForm = { 
    signUp: Function;
}

const errorMsg = {
    empty: "아이디를 입력해주세요",
    exist_id: "이미 등록된 아이디입니다. 다른 아이디를 입력해주세요",
};

export default function form({signUp}: propsForm) {
    const [user, setUser] = useState<User>({ name: "", id: "", password: "" });

    const [errorId, setErrorId] = useState(errorMsg.empty);

    function handleName(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, name: e.target.value });
    }

    function handleId(e: React.ChangeEvent<HTMLInputElement>) {
        setErrorId(errorMsg.empty);
        setUser({ ...user, id: e.target.value });
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, password: e.target.value });
    }


    return (
            <Form>
                <Form.Group className="mb-3" controlId={"formBasicName"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={handleName}
                        type={"text"}
                        placeholder={"Enter name"}
                        minLength={3}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        이름을 입력해주세요!(3글자 이상입력)
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        We'll never share your name with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId={"formBasicEmail"}>
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                        onChange={handleId}
                        type={"text"}
                        placeholder={"Enter Id"}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        {errorId}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"formBasicPassword"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={handlePassword}
                        type={"password"}
                        placeholder={"Password"}
                        required />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        비밀번호를 입력해주세요!
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant={"success"} onClick={() => {
                        signUp(user.name, user.id, user.password);
                    }}>
                        Sign up
                    </Button>
                </div>
                <br/>
            <p className='text-center'>Already have an account? <Link href='/signin'>Log in</Link></p>
            </Form>
    )
}