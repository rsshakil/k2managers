import React from "react";
import BreadCrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import { ItemData } from "../../../utilities/projectBtnItemData";
import OutlineButtonLinkContainer from "../../../components/Button/OutlineButtonLinkContainer";
import BusWayForm from "../../../components/Form/Bus/BusWayForm";
import useGetBusStop from "../../../hooks/useGetBusStop";
import {useNavigate} from "react-router-dom";

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
const BusWayAdd = () => {
    const navigate = useNavigate();
    const busRouteName = sessionStorage.getItem("busRouteName");
    const busRouteId = sessionStorage.getItem("busRouteId");
    console.log('--------------busRouteId---------------', busRouteId);
    const { busStop, busStopError, busStopLoading } = useGetBusStop(busRouteId)
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData}/>
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
                <BreadCrumbs
                    title="バス便新規追加 "
                />
            </div>
            <BusWayForm
                // initialValues={{ ...busStop }}
                initialValues={initialValues}
                busStop={busStop}
                busRouteId={busRouteId}
                formType="add"/>
        </>
    );
}
export default BusWayAdd;