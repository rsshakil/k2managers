import { useEffect, useState } from 'react';
import { baseURL, listCategory, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetValidCategoryList = () => {
    const [categoryList, setCategoryList] = useState({});
    const [categoryError, setCategoryError] = useState(null);
    const [categoryLoading, setCategoryLoading] = useState(false);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setCategoryLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listCategory}?pid=${projectId}&status=1`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setCategoryList(response.data.records);
            } catch (error) {
                setCategoryError(error.message);
            } finally {
                setCategoryLoading(false);
            }
        };
        fetchCategory();
    }, []);

    return { categoryList, categoryLoading, categoryError };
};

export default useGetValidCategoryList;
