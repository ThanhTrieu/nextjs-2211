import { Layout, Menu } from 'antd';
import React from 'react';
import styles from '@/styles/Header.module.css';

const { Header } = Layout;
const items = [
    {label: 'Home', key: '/'},
    {label: 'Cart', key: '/cart'}
];

export default function HeaderComponent(){
    return (
        <Header className={styles.header}>
            <div className={styles.logo} />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['/']} items={items}
            />
        </Header>
    )
}