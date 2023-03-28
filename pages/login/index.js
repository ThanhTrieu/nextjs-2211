import { Button, Form, Input, Row, Col } from 'antd';
import { signIn, getCsrfToken } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import { useState } from 'react';


const LoginPage = ({ csrfToken }) => {
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        const username = values.username;
        const password = values.password;
        const result = await signIn('credentials', {
            redirect: "/",
            username: username,
            password: password,
            callbackUrl: `${window.location.origin}`
        });
        if(result?.error){
            setError(result.error);
        } else {
            setError(null);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row>
            <Col span={6} offset={9}>
                <Form
                    name="basic"
                    style={{
                      marginTop: 20,
                      border: '1px solid #ccc',
                      padding: 20,
                      backgroundColor: 'whitesmoke'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    {
                        error && (<p style={{ color: 'red',fontWeight:'bold', textAlign:'center' }}> {error} </p>)
                    } 

                    <Form.Item
                        name="csrfToken"
                        style={{ display: 'none' }}
                    >
                        <Input type='hidden' defaultValue={csrfToken} />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={false}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
};
export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res)
    if (session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context),
        }
    }
}

export default LoginPage;