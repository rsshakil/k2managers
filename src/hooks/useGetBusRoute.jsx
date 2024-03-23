import { useEffect, useState } from 'react';
import { baseURL, listBusRoute, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';
export default function useGetBus(busRouteId) {
    const [busRoute, setBusRoute] = useState({});
    const [busRouteError, setBusRouteError] = useState(null);
    const [busRouteLoading, setBusRouteLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listBusRoute}${busRouteId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setBusRoute(response.data.records);
            } catch (error) {
                setBusRouteError(error.message);
            } finally {
                setBusRouteLoading(false);
            }
        };
        fetchEvent();
    }, [busRouteId]);
    return { busRoute, busRouteLoading, busRouteError };
}
