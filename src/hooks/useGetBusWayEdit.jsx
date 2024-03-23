import { useEffect, useState } from 'react';
import { baseURL, listBusWay, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetBusWayEdit = (busRouteId, pathName) => {
    const [busWay, setBusWay] = useState({});
    const [busWayError, setBusWayError] = useState(null);
    const [busWayLoading, setBusWayLoading] = useState(true);

    useEffect(() => {
        const fetchBusWay = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listBusWay}${busRouteId}?pid=${projectId}&busWayId=${pathName}`;
                const config = { method: listMethod, url: ENDPOINT };
                const { data } = await instance.request(config);
                data && setBusWay(data);
            } catch (error) {
                setBusWayError(error.message);
            } finally {
                setBusWayLoading(false);
            }
        };
        fetchBusWay();
    }, [busRouteId]);

    return { busWay, setBusWayLoading, busWayError, busWayLoading };
};
export default useGetBusWayEdit;
