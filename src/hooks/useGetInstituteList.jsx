import { useEffect, useState } from 'react';
import { baseURL, listInstitute, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetValidInstituteList = () => {
    const [instituteList, setInstituteList] = useState({});
    const [instituteError, setInstituteError] = useState(null);
    const [instituteLoading, setInstituteLoading] = useState(false);

    useEffect(() => {
        const fetchInstitute = async () => {
            try {
                setInstituteLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listInstitute}?pid=${projectId}&status=1`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setInstituteList(response.data.records);
            } catch (error) {
                setInstituteError(error.message);
            } finally {
                setInstituteLoading(false);
            }
        };
        fetchInstitute();
    }, []);
    return { instituteList, instituteLoading, instituteError };
};

export default useGetValidInstituteList;
