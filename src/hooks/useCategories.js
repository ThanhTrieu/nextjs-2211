import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProductsCategory } from "@/src/services/category";

export const useCategories = () => {
    // dung react query de call api
    return useQuery(['categories'], () => fetchCategories())
}

export const useProductsCategory = (name, page = 1, limit = 10) => {
    return useQuery(
        ['productsCategory', name, page, limit],
        () => fetchProductsCategory(name, page, limit)
    );
}