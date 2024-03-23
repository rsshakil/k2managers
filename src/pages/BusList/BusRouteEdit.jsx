import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import BusRouteForm from '../../components/Form/Bus/BusRouteForm';
import useAddGetBusStop from '../../hooks/useAddGetBusStop';
import useGetBusRoute from '../../hooks/useGetBusRoute';
import { ItemData } from '../../utilities/projectBtnItemData';


const BusRouteEdit = () => {
    const { busRouteId } = useParams();

    const { busRoute, busRouteLoading, busRouteError } = useGetBusRoute(busRouteId); //useBusRoute //useBusWay
    const { busStop, busStopLoading } = useAddGetBusStop();

    const [busStopData, setBusStopData] = useState([]);
    const [isOverFlow, setIsOverFlow] = useState(false);

    useEffect(() => {
        setBusStopData([...busStop]);
    }, [busStopLoading]);

    return (
        <>
            {busRoute && busStopData && (
                <>
                    <OutlineButtonLinkContainer ItemData={ItemData} />
                    <BreadCrumbs
                        title={`バス路線 > 編集`} // title={`バス路線 > 編集 : ${bus?.busRouteName ? bus?.busRouteName : ""}`}
                        className="mt-4 text-blue-50 font-bold px-4"
                    />
                    <BusRouteForm
                        busRouteStopStyle={busRoute.busRouteStopStyle ? busRoute.busRouteStopStyle : []}
                        initialValues={{ ...busRoute }}
                        formType="edit"
                        load={busRouteLoading}
                        error={busRouteError}
                        editForm={true}
                        setIsOverFlow={setIsOverFlow}
                        busStops={busStopData ? busStopData : []}
                        busStopLoading={busStopLoading}
                    />
                </>
            )}
        </>
    );
};
export default BusRouteEdit;
