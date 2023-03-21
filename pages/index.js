import LayoutPage from "@/components/LayoutPage";
import { fetchDataProductsByPage } from "@/src/services/products";
import ListProducts from "@/components/products/ListProducts";

function Home({ productsData }) {
  return (
    <LayoutPage>
      <ListProducts productsData={productsData}/>
    </LayoutPage>
  )
}
export async function getServerSideProps({ query }) {
  let page = query.page || 1;
  let skip = query.skip || 10;
  let productsData = null;
  try {
    productsData = await fetchDataProductsByPage(page, skip);
  } catch (err) {
    productsData = { error: { message:  err} }
  }
  return {
    props: { productsData }
  }
}

export default Home;