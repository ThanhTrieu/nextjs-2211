import LayoutPage from "@/components/LayoutPage";
import { Row, Col, Card, Skeleton } from "antd";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchProductsCategory } from "@/src/services/category";
import { useProductsCategory } from "@/src/hooks/useCategories"
import { useRouter } from "next/router";
import React, { useState } from "react";

const { Meta } = Card;

const Index = () => {
    const router = useRouter();
    const nameCate = router.query.name;

    const [page, setPage] = useState(1);
    const [limited, setLimit] = useState(10);
    const { data, isLoading, isError } = useProductsCategory(nameCate, page, limited);
    const { products, total, skip, limit } = data;

    if(isLoading){
        return (
            <LayoutPage>
                <Skeleton active />
            </LayoutPage>
        )
    }

    if(isError){
        return (
            <LayoutPage>
                <p>an error occurred !</p>
            </LayoutPage>
        )
    }

    return (
        <LayoutPage>
            <Row>
            {products.map((item,index) => (
                <Col span={6} key={index}>
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
                </Col>
            ))}
            </Row>
        </LayoutPage>
    )
}
export async function getStaticProps(context) {
    const nameCategory = context.params.name;
    const page = 1;
    const limit = 10;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        ['productsCategory', nameCategory, page, limit],
        () => fetchProductsCategory(nameCategory, page, limit)
    )
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
export async function getStaticPaths(){
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default Index