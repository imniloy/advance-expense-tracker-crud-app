import axios from "../../utils/axios";

export const getTransactions = async (currentPage, limit, searchTransition, transitionType) => {

    let queryString = '';
    if (currentPage) queryString += `_page=${currentPage}&_limit=${limit}`;

    if (searchTransition !== '' && queryString.length > 0) {
        queryString += `&name_like=${searchTransition}`
    } else if (searchTransition !== '' && queryString.length === 0) {
        queryString += `&name_like=${searchTransition}&_limit=${limit}`
    }

    if (transitionType) {
        queryString += `&type=${transitionType}`;
    }

    if (queryString.length > 0) {
        const response = await axios.get(`/transactions?_sort=id&_order=desc&${queryString}`);
        return {
            responseData: response?.data,
            totalTransactions: response?.headers['x-total-count'],
        };
    } else {
        const response = await axios.get(`/transactions?_sort=id&_order=desc`);
        return {
            responseData: response?.data,
            totalTransactions: response?.headers["x-total-count"],
        };
    }

};

export const addTransaction = async (data) => {
    const response = await axios.post("/transactions", data);

    return response?.data;
};

export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);

    return response?.data;
};

export const deleteTransaction = async (id) => {
    const response = axios.delete(`/transactions/${id}`);

    return response?.data;
};
