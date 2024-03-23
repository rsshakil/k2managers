import { useEffect, useState } from 'react';
import { baseURL, listDomain, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetDomain = (domainId) => {
    const [domain, setDomain] = useState({});
    const [domainError, setDomainError] = useState(null);
    const [domainLoading, setDomainLoading] = useState(true);
    useEffect(() => {
        const fetchDomain = async () => {
            try {
                const ENDPOINT = `${baseURL}${listDomain}${domainId}?`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setDomain(response.data.records);
            } catch (error) {
                setDomainError(error.message);
            } finally {
                setDomainLoading(false);
            }
        };
        fetchDomain();
    }, [domainId]);
    
    return { domain, domainLoading, domainError };
};

export default useGetDomain;
