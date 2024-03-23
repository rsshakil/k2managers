import { baseURL } from '../restapi/queries';

const fetchRecords = {};

let isProcessing = false;

fetchRecords.filter = ({ setId = '', setName = '', setOptions, endPoint, projectId, setLoading }) => {

    if (isProcessing) return;
    setLoading && setLoading(true) // start loading
    // console.log("Start Loading")
    isProcessing = true;
    const WithOut_PID_API = endPoint && `${baseURL}${endPoint}?itemsPerPage=300&pagesVisited=0`;
    const api = projectId ? `${WithOut_PID_API}&pid=${projectId}` : WithOut_PID_API;
    api &&
        new Promise(async (resolve, reject) => {
            try {
                const headers = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await fetch(api, headers);
                const result = await response.json();
                setLoading && setLoading(true) // start loading
                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    resolve(result);
                    const newOption = result.records.map((record) => ({
                        id: record[setId],
                        value: record[setName],
                    }));
                    setOptions(newOption);
                    isProcessing = false;
                    setLoading && setLoading(false) // stop loading
                }
                setLoading && setLoading(false) // stop loading
                // console.log("Stop Loading")
            } catch (error) {
                console.log('Error Fetching Data ');
                reject(error.message);
                setLoading && setLoading(false) // stop loading
            }
        });
};

export default fetchRecords;
