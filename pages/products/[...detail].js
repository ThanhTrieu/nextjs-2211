import LayoutPage from '@/components/LayoutPage';
import { fetchDataProductsById } from '@/src/services/products';
import { Row, Col, Image } from 'antd';

export default function Index({ detailProduct }){

    if(detailProduct.error){
        return (
            <LayoutPage>
                <h2>{detailProduct.error.message}</h2>
            </LayoutPage>
        )
    }

    return (
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

                </Col>
            </Row>
        </LayoutPage>
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