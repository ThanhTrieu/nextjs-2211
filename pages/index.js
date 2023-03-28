import Head from "next/head";
import LayoutPage from "@/components/LayoutPage";
import { fetchDataProductsByPage } from "@/src/services/products";
import ListProducts from "@/components/products/Products";
import Script from "next/script";

function Home({ productsData }) {
  return (
    <>
      <Head>
        <title>E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css"
        />
      </Head>
      <LayoutPage>
        <ListProducts productsData={productsData} />
      </LayoutPage>
      <div
        id="snipcart"
        data-api-key="MjJiNTI4OGMtNjkyNi00YmE1LWE1NjMtOWNjNzI4YTk3Yzg2NjM4MTQ5OTQ4NTQ0NzUwMjg5"
        data-config-modal-style="side"
        hidden
      ></div>
      <Script src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js" />
    </>
  )
}
export async function getServerSideProps({query}) {
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