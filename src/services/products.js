import { requestClient } from "@/src/axios/request"

export const fetchDataProductsByPage = async (page = 1, limit = 10) => {
    const start = (page - 1)*limit;
    const response = await requestClient.get(`/products?limit=${limit}&skip=${start}`);
    return await response.data;
}

export const fetchDataProductsById = async (id) => {
    const response = await requestClient.get(`/products/${id}`);
    return await response.data;
}