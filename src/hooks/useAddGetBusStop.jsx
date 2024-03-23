import { useEffect, useState } from 'react';
import { baseURL, listBusStop, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

export default function useAddGetBusStop() {
    const [busStop, setBusStop] = useState([]);
    const [busStopError, setBusStopError] = useState(null);
    const [busStopLoading, setBusStopLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setBusStopLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listBusStop}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);

                if (response) {
                    let array = [...response.data.records];

                    for (let i = 0; i < array.length; i++) {
                        array[i].id = array[i].busStopId;
                        array[i].text = array[i].busStopName;
                        array[i].disabled = false;
                    }

                    setBusStop([...array]);
                }
            } catch (error) {
                setBusStopError(error.message);
            } finally {
                setBusStopLoading(false);
            }
        };
        fetchEvent();
    }, []);

    return { busStop, busStopError, busStopLoading };
}
