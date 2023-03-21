import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { Pagination as PaginationProducts } from "@/components/commons/Pagination";
import { useRouter } from "next/router";
import Link from "next/link";
import slugify from 'react-slugify';

const { Meta } = Card;

const ListProducts = ({ productsData }) => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [err, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { pathname, query } = router;

    useEffect(() => {
        if (productsData.error) {
            setError(productsData.error.message)
        } else {
            setProducts(productsData.products)
        }
    }, [productsData]);

    const changePage = p => {
        // bo sung tham so vao query string tren url trinh duyet
        query.page = p;
        query.skip = limit;
        router.push({
            pathname,
            query
        })
        setPage(p);
    }

    const changeSizePage = (p, s) => {
        query.page = p;
        query.skip = s;
        router.push({
            pathname,
            query
        })
        setLimit(s);
    }


    if (err) {
        return (
            <h4>{err}</h4>
        )
    }

    return (
        <>
            <Row>
                {products.map((item, index) => (
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
                total={productsData.total}
                pageSize={limit}
                onChange={changePage}
                onShowSizeChange={changeSizePage}
            />
        </>
    )
}
export default ListProducts