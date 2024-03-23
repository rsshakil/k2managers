import { useEffect, useState } from 'react';
import { baseURL, listMethod, updateBusStop } from '../restapi/queries';
import { instance } from '../services/axios.js';

export default function useGetBusStopUpdate(busStopId) {
    const [busStop, setBusStop] = useState({});
    const [busStopError, setBusStopError] = useState(null);
    const [busStopLoading, setBusStopLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${updateBusStop}${busStopId}?pid=${projectId}`;
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
    }, [busStopId]);

    return { busStop, busStopError, busStopLoading };
}
