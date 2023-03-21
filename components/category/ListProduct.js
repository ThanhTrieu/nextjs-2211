import React, { useState } from "react";
import { Row, Col, Skeleton, Card, Alert } from 'antd';
import { useProductsCategory } from "@/src/hooks/useCategories";
import { Pagination as PaginationProducts } from "@/components/commons/Pagination";
import { useRouter } from "next/router";
import Link from "next/link";
import slugify from 'react-slugify';

const { Meta } = Card;

const ListProductCategory = () => {
    const router = useRouter();
    const nameCate = router.query.name;

    const [page, setPage] = useState(1);
    const [limited, setLimit] = useState(10);
    const {
        data,
        isLoading,
        isError,
        isPreviousData
    } = useProductsCategory(nameCate, page, limited);

    if(isLoading){
        return (
            <Skeleton active />
        )
    }

    const changePage = p => {
        if(!isPreviousData){
            setPage(p)
        }
    }

    const changeSizePage = (p,s) => {
        if(!isPreviousData){
            setPage(p)
            setLimit(s)
        }
    }

    if(isError){
        return (
            <Alert
                message="Error"
                description="an error occurred !"
                type="error"
                showIcon
            />
        )
    }

    return (
        <>
            <Row>
                {data.products.map((item,index) => (
                    <Col span={6} key={index}>
                        <Link href={`/products/${slugify(item.title)}/${item.id}`}>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                    marginBottom: 15,
                                    marginLeft: 5
                                }}
                                cover={<img alt={item.title} src={item.thumbnail} />}
                                >
                                <Meta title={item.title} />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <PaginationProducts
                current={page}
                total={data.total}
                pageSize={limited}
                onChange={changePage}
                onShowSizeChange={changeSizePage}
            />
        </>
    )
}
export default ListProductCategory;