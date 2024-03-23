import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import OutlineButtonLinkContainer from "../../../components/Button/OutlineButtonLinkContainer";
import BusStopForm from "../../../components/Form/Bus/BusStopForm";
import useGetBusStopUpdate from "../../../hooks/useGetBusStopUpdate";
import { ItemData } from "../../../utilities/projectBtnItemData";

const initialValues = {
    busStopName: '',
    busStopAddress: '',
    memo: '',
};
const BusStopEdit = () => {
    const navigate = useNavigate()
    const { busStopId } = useParams();
    const { busStop, busStopError, busStopLoading } = useGetBusStopUpdate(busStopId)
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="flex flex-start text-blue-50 mt-4">
                <BreadCrumbs title="バス路線"
                    className="underline cursor-pointer font-bold px-4"
                    onClick={() => navigate("/bus_route_list")}
                />
                <span>&gt;</span>
                <BreadCrumbs title="バス停一覧 "
                    className="underline cursor-pointer font-bold"
                    onClick={() => navigate("/bus_stop_list")}
                /> <span>&gt;</span>
                <BreadCrumbs title="編集"
                    className="font-bold"
                />
            </div>
            <BusStopForm
                initialValues={{ ...busStop }}
                load={busStopLoading}
                error={busStopError}
                setIsOverFlow={setIsOverFlow}
                formType="edit" />
        </>
    )
}
export default BusStopEdit;