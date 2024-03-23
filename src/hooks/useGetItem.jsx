import { useEffect, useState } from 'react';
import { baseURL, listItem, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetItem = (itemId) => {
    const [item, setItem] = useState({});
    const [itemError, setItemError] = useState(null);
    const [itemLoading, setItemLoading] = useState(true);
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listItem}${itemId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setItem(response.data.records);
            } catch (error) {
                setItemError(error.message);
            } finally {
                setItemLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);
    return { item, itemLoading, itemError };
};

export default useGetItem;
