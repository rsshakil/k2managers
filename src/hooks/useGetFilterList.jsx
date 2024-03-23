import { useEffect, useState } from 'react';
import { baseURL, listFilter, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetFilterList = () => {
    const [filterList, setFilterList] = useState({});
    const [filterError, setFilterError] = useState(null);
    const [filterLoading, setFilterLoading] = useState(true);
    useEffect(() => {
        const fetchFilter = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listFilter}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setFilterList(response.data.records);
            } catch (error) {
                setFilterError(error.message);
            } finally {
                setFilterLoading(false);
            }
        };
        fetchFilter();
    }, []);

    return { filterList, filterLoading, filterError };
};

export default useGetFilterList;
