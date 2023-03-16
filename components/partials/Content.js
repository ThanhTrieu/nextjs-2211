import { Layout } from 'antd';

const { Content } = Layout;

export default function ContentComponent({ children }){
    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: '100vh',
                background: '#ffffff',
            }}
        >
            {children}
        </Content>
    )
}