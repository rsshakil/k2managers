import * as queries from './queries';
import axios from 'axios';

export const handleListLog = () => {
    axios({
        url: process.env.REACT_APP_APPSYNC_API_URL,
        method: 'post',
        headers: {
            'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY,
        },
        data: {
            query: queries.listLogs,
        },
    })
        .then((res) => {
            return res.data.data.listLogs.items;
        })
        .catch((err) => {
            console.log('Log data fetch error 1: ', err);
        });
};
