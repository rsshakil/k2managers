import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../../components/Button/OutlineButtonLinkContainer';
import BusWayForm from "../../../components/Form/Bus/BusWayForm";
import useGetBusStop from '../../../hooks/useGetBusStop';
import useGetBusWayEdit from '../../../hooks/useGetBusWayEdit';
import { ItemData } from '../../../utilities/projectBtnItemData';
const initialValues = {
    busRouteId: "",
    busWayName: "",
    busWayOverview: "",
    busWayDescription: "",
    busWayCapacity: "",
    createdBy: "",
    updatedBy: "",
    busTime: "",
    memo: '',
};
export default function BusWayEdit() {
    const location = useLocation()
    const navigate = useNavigate()
    let pathName = location.pathname.split("/").pop();
    const busRouteName = sessionStorage?.getItem("busRouteName");
    const [isOverFlow, setIsOverFlow] = useState(false);
    const busRouteId = sessionStorage.getItem("busRouteId");

    const { busStop, busStopError, busStopLoading } = useGetBusStop(busRouteId)
    const { busWay, setBusWayLoading, busWayError, busWayLoading } = useGetBusWayEdit(busRouteId, pathName)
    // console.log("8888888888888888 busWay 88888888888888888888 ", busWay);

    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="flex flex-start text-blue-50 mt-4 font-bold px-4">
                <BreadCrumbs
                    title="バス路線"
                    className="underline cursor-pointer pl-2 pt-px pb-0.5"
                    onClick={() => navigate("/bus_route_list")}
                />
                <span>&gt;</span>
                <BreadCrumbs title={busRouteName}
                    className="underline cursor-pointer pl-2 pt-px pb-0.5"
                    onClick={() => navigate(`/bus_way_list/${busRouteId}`)}
                /><span>&gt;</span>
                <BreadCrumbs title="バス便編集"
                />
            </div>
            <BusWayForm
                // initialValues={{ ...busStop }}
                initialValues={busWay}
                busStop={busStop}
                busRouteId={busRouteId}
                load={busWayLoading}
                busStopInitialTime={busWay.busStops}
                setIsOverFlow={setIsOverFlow}
                formType="edit" />
        </>
        // <BusWayForm

        // />
    );
}
