import Head from "next/head";
import { useState } from "react";
import LayoutPage from '@/components/LayoutPage';
import { fetchDataProductsById } from '@/src/services/products';
import { Row, Col, Image, InputNumber } from 'antd';
import Script from "next/script";

export default function Index({ detailProduct }){
    const [quantity, setQuantity] = useState(1);

    const onChange = (value) => {
        setQuantity(value)
    };

    if(detailProduct.error){
        return (
            <LayoutPage>
                <h2>{detailProduct.error.message}</h2>
            </LayoutPage>
        )
    }

    return (
        <div>
            <Head>
                <title>{detailProduct.title}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://cdn.snipcart.com" />
                <link
                    rel="stylesheet"
                    href="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css"
                />
            </Head>
            <LayoutPage>
                <Row>
                    <Col span={8}>
                        <Image src={detailProduct.thumbnail} />
                    </Col>
                    <Col span={16} style={{ padding: '15px' }}>
                        <h2>{detailProduct.title}</h2>
                        <p>{detailProduct.category}</p>
                        <p>{detailProduct.brand}</p>
                        <p>{detailProduct.description}</p>
                        <p>Price: {detailProduct.price}</p>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={quantity}
                            onChange={onChange}
                        />
                        <br/>
                        <button
                            style={{ height: '30px', marginTop: '5px', padding: '5px' }}
                            data-item-id={detailProduct.id}
                            data-item-image={detailProduct.thumbnail}
                            data-item-name={detailProduct.title}
                            data-item-url="/"
                            data-item-price={detailProduct.price}
                            data-item-quantity={quantity}
                        >
                            Add to Cart
                        </button>
                    </Col>
                </Row>
            </LayoutPage>
            <div
                id="snipcart"
                data-api-key="MjJiNTI4OGMtNjkyNi00YmE1LWE1NjMtOWNjNzI4YTk3Yzg2NjM4MTQ5OTQ4NTQ0NzUwMjg5"
                data-config-modal-style="side"
                hidden
            ></div>
            <Script src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js" />
        </div>
    )
}

export async function getStaticProps({ params }) {
    let detailProduct = null;
    try {
        const { detail } = params;
        const idPd = detail[1] || 0;
        detailProduct = await fetchDataProductsById(idPd);
    } catch (err) {
        detailProduct = {error: { message: err }}
    }
    return {
        props : { detailProduct }
    }
}
export async function getStaticPaths(){
    return {
        paths: [],
        fallback: "blocking"
    }
}