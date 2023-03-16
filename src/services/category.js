import { requestClient } from "@/src/axios/request"

export const fetchCategories = async () => {
    const response = await requestClient.get('/products/categories');
    return await response.data;
}

export const fetchProductsCategory = async (name, page = 1, limit = 10) => {
    const start = (page - 1)*limit;
    const response = await requestClient.get(`/products/category/${name}?limit=${limit}&skip=${start}`);
    return await response.data;
}