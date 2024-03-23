import { useEffect, useState } from 'react';
import { baseURL, listFilter, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetFilter = (filterId) => {
    const [filter, setFilter] = useState({});
    const [filterError, setFilterError] = useState(null);
    const [filterLoading, setFilterLoading] = useState(true);
    useEffect(() => {
        const fetchFilter = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listFilter}${filterId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setFilter(response.data.records);
            } catch (error) {
                setFilterError(error.message);
            } finally {
                setFilterLoading(false);
            }
        };
        fetchFilter();
    }, [filterId]);

    return { filter, filterLoading, filterError };
};

export default useGetFilter;
