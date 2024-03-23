import { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { baseURL, listBusWay, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetBusWay = (busRouteId) => {
    const navigate = useNavigate();
    const [busWay, setBusWay] = useState({});
    const [headerCells, setHeaderCells] = useState([]);
    const [busWayError, setBusWayError] = useState(null);
    const [busWayLoading, setBusWayLoading] = useState(true);

    useEffect(() => {
        const fetchBusWay = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listBusWay}${busRouteId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response) {
                    setBusWay(response.data.records);
                    let headerJson = [];
                    for (let i = 0; i < response.data.records[0].length; i++) {
                        let row = response.data.records[0][i];
                        headerJson.push({
                            label: row?.busWayName,
                            minWidth: '5rem',
                            busWayId: row.busWayId ? row.busWayId : '',
                            endIcon: row.busWayId ? (
                                <BsFillPencilFill
                                    onClick={() => {
                                        navigate(`/bus_way_edit/${row.busWayId}`);
                                    }}
                                />
                            ) : (
                                ''
                            ),
                        });
                    }
                    setHeaderCells(headerJson);
                }
            } catch (error) {
                setBusWayError(error.message);
            } finally {
                setBusWayLoading(false);
            }
        };
        fetchBusWay();
    }, [busRouteId]);

    return { headerCells, busWay, setBusWayLoading, busWayError, busWayLoading };
};
export default useGetBusWay;
