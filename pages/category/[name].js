import LayoutPage from "@/components/LayoutPage";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchProductsCategory } from "@/src/services/category";
import ListProductCategory from "@/components/category/ListProduct";

const Index = () => {
    return (
        <LayoutPage>
            <ListProductCategory />
        </LayoutPage>
    )
}
export async function getStaticProps(context) {
    const nameCategory = context.params.name;
    const page  = 1;
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