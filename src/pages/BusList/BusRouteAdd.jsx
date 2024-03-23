import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import BusRouteForm from '../../components/Form/Bus/BusRouteForm';
import useAddGetBusStop from '../../hooks/useAddGetBusStop';
import { ItemData } from '../../utilities/projectBtnItemData';

const initialValues = {
    busRouteImageURL1: '',
    busRouteImageURL2: '',
    busRouteImageURL3: '',
    busRouteCode: '',
    busRouteName: '',
    busRouteManageName: '',
    busRouteOverview: '',
    busRouteDescription: '',
    memo: '',
};
const BusRouteAdd = () => {
    const { busStop, busStopLoading } = useAddGetBusStop();
    const [busStopData, setBusStopData] = useState([]);

    useEffect(() => {
        setBusStopData([...busStop]);
    }, [busStopLoading]);

    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="バス路線 > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <BusRouteForm initialValues={initialValues} formType="add" busStops={busStopData ? busStopData : []} />
        </>
    );
};
export default BusRouteAdd;
