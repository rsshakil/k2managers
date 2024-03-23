import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL, listCategory, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetCategory = (categoryId) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({});
    const [categoryError, setCategoryError] = useState(null);
    const [categoryLoading, setCategoryLoading] = useState(true);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listCategory}${categoryId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setCategory(response.data.records);
                if (response.data.message === 'no data') navigate('/top');
            } catch (error) {
                setCategoryError(error.message);
            } finally {
                setCategoryLoading(false);
            }
        };
        fetchCategory();
    }, [categoryId]);
    return { category, categoryLoading, categoryError };
};

export default useGetCategory;
