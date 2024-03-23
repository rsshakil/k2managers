import { useEffect, useState } from 'react';
import { baseURL, getAccount, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetAccount = (accountId) => {
    const [account, setAccount] = useState({});
    const [accountError, setAccountError] = useState(null);
    const [accountLoading, setAccountLoading] = useState(true);
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const ENDPOINT = `${baseURL}${getAccount}${accountId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response) setAccount(response.data.records);
            } catch (error) {
                setAccountError(error.message);
            } finally {
                setAccountLoading(false);
            }
        };
        fetchAccount();
    }, [accountId]);

    return { account, accountError, accountLoading };
};
export default useGetAccount;
