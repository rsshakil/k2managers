import { useEffect, useState } from 'react';
import { baseURL, listBusWay, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

export default function useGetBusStop(busRouteId) {
    const [busStop, setBusStop] = useState({});
    const [busStopError, setBusStopError] = useState(null);
    const [busStopLoading, setBusStopLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listBusWay}${busRouteId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setBusStop(response.data.records);
            } catch (error) {
                setBusStopError(error.message);
            } finally {
                setBusStopLoading(false);
            }
        };
        fetchEvent();
    }, [busRouteId]);

    return { busStop, busStopError, busStopLoading };
}
