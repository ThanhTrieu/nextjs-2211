import React, { useState, useEffect } from "react";
import styles from "@/components/products/Product.module.css";
import Image from "next/image";
import { Pagination as PaginationProducts } from "@/components/commons/Pagination";
import { useRouter } from "next/router";
import slugify from 'react-slugify';

export default function Product({ productsData }) {
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
        <div className={styles.grid}>
            {products.map((item) => (
                <div
                    key={item.id}
                    className={styles.product}
                >
                    <a
                        title={item.title}
                        href={`/products/${slugify(item.title)}/${item.id}`}
                    >
                        <Image
                            src={item.thumbnail}
                            alt={`Image of ${item.title}`}
                            height="240"
                            width="240"
                        />
                        <h3 style={{ marginTop: '10px' }}>{item.title}</h3>
                    </a>
                    <p>{item.description}</p>
                    <span>${item.price}</span>
                
                    <div>
                        <button
                            className="snipcart-add-item"
                            data-item-id={item.id}
                            data-item-image={item.thumbnail}
                            data-item-name={item.title}
                            data-item-url="/"
                            data-item-price={item.price}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <br/>
        <PaginationProducts
            current={page}
            total={productsData.total}
            pageSize={limit}
            onChange={changePage}
            onShowSizeChange={changeSizePage}
        />
        </>
    );
}