import { useEffect, useState , useRef} from 'react';
import { baseURL, listEventBus, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEventBus = (mappingId) => {
    const [eventBus, setEventBus] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const processing = useRef(false);
    useEffect(() => {
        const fetchEventBus = async () => {
            try {
                if (processing.current) return;
                processing.current = true;
                const ENDPOINT = `${baseURL}${listEventBus}${mappingId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setEventBus(response.data.records);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoad(false);
                processing.current = false;
            }
        };
        fetchEventBus();
    }, []);

    return { eventBus, load, error };
};

export default useGetEventBus;
