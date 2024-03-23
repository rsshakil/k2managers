import React from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../../components/Button/OutlineButtonLinkContainer';
import BusStopForm from '../../../components/Form/Bus/BusStopForm';
import { ItemData } from '../../../utilities/projectBtnItemData';

const initialValues = { busStopName: '', busStopManageName: '', busStopAddress: '', memo: '' };

const BusStopAdd = () => {
    const navigate = useNavigate();
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="flex flex-start text-blue-50 mt-4 px-4">
                <BreadCrumbs
                    title="バス路線"
                    className="underline cursor-pointer font-bold"
                    onClick={() => navigate('/bus_route_list')}
                />
                <span>&gt;</span>
                <BreadCrumbs
                    title="バス停一覧 "
                    className="underline cursor-pointer font-bold"
                    onClick={() => navigate('/bus_stop_list')}
                />{' '}
                <span>&gt;</span>
                <BreadCrumbs title="新規追加" className="font-bold" />
            </div>
            <BusStopForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default BusStopAdd;
