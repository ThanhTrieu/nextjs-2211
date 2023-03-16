import LayoutPage from "@/components/LayoutPage";
import { fetchDataProductsByPage } from "@/src/services/products";
import { Row, Col, Card } from "antd";

const { Meta } = Card;

function Home({ data }) {
  const { products, total, skip, limit } = data;

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
export async function getServerSideProps() {
  const data = await fetchDataProductsByPage(1, 10);
  return {
    props: { data }
  }
}

export default Home;