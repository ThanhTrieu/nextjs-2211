import { Layout, Menu, Skeleton } from 'antd';
import { AppstoreFilled } from '@ant-design/icons';
import React from 'react';
import { useCategories } from '@/src/hooks/useCategories';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Sider } = Layout;

export default function SiderComponent(){
    const { data, isLoading } = useCategories();
    const { asPath } = useRouter();

    let items = [];
    if(isLoading){
        return (
            <Sider
                width={200}
                style={{
                    background: '#ffffff',
                }}
            >
                <Skeleton active />
            </Sider>
        )
    }
    if(data) {
        items = data.map(item => ({
            key: `/category/${item}`,
            label: <Link href={`/category/${item}`}>{item}</Link>,
            icon: <AppstoreFilled/>
        }))
    }

    return (
        <Sider
            width={200}
            style={{
                background: '#ffffff',
            }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={asPath}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={items}
            />
        </Sider>
    )
}