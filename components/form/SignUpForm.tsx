import Link from "next/link";
import { FC, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
// import { existUser, saveUser } from "../api";

interface ResultMessage {
    resultCode: string;
    resultMessage: string;
}

interface User {
    name: string;
    email: string;
    password: string;
}

interface SignupProps { }

const errorMsg = {
    empty: "메일 주소를 입력해주세요",
    exist_email: "이미 등록된 메일입니다. 다른 메일을 입력해주세요",
};

const Signup: FC<SignupProps> = () => {
    const [user, setUser] = useState<User>({ name: "", email: "", password: "" });
    const [validated, setValidated] = useState(false);
    const [resultMessage, setResultMessage] = useState<ResultMessage>({
        resultCode: "200",
        resultMessage: "ok",
    });

    const [isValid, setIsValid] = useState(false);
    const [errorMail, setErrorMail] = useState(errorMsg.empty);

    function handleName(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
        setUser({ ...user, name: e.target.value });
    }

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
        setIsValid(false);
        setErrorMail(errorMsg.empty);
        setUser({ ...user, email: e.target.value });
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, password: e.target.value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            //   saveUser(user).then((response) => {
            //     setResultMessage({
            //       resultCode: response.code,
            //       resultMessage: response.message,
            //     });
            //     if (response.status === 400) {
            //       setIsValid(true);
            //       setErrorMail(`[${response.code}] ${errorMsg.exist_email}`);
            //       alert("오류");
            //     }
            //     if (response.status === 200) {
            //       alert("등록되었습니다.");
            //       setIsValid(false);
            //     }
            //   });
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
    }

    return (
            <Form>
                <Form.Group controlId={"formBasicEmail"}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        // className={`form-signup-email ${isValid ? "is-invalid" : ""}`}
                        onChange={handleEmail}
                        type={"email"}
                        placeholder={"Enter email"}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        {errorMail}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"formBasicName"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        // className={"form-signup-input"}
                        onChange={handleName}
                        type={"text"}
                        placeholder={"Enter name"}
                        minLength={3}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        이름을 입력해주세요!(3글자 이상입력)
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"formBasicPassword"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        // className={"form-signup-input"}
                        onChange={handlePassword}
                        type={"password"}
                        placeholder={"Password"}
                        required />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        비밀번호를 입력해주세요!
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant={"success"} type={"submit"}>
                        Sign up
                    </Button>
                </div>
                <br/>
            <p className='text-center'>Already have a account? <Link href='/signin'>Log in</Link></p>
            </Form>
    )
}

export default Signup;
