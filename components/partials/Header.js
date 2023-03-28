import { Layout, Menu } from 'antd';
import React from 'react';
import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Header } = Layout;
const items = [
    {label: <Link href="/">Home</Link>, key: '/'},
    {label: <a href="/#/cart"> Cart</a>, key: '/#/cart'}
];

export default function HeaderComponent(){
    const { asPath } = useRouter();
    return (
        <Header className={styles.header}>
            <div className={styles.logo} />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={asPath} items={items}
            />
        </Header>
    )
}