import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import LayoutBody from '../../components/LayoutBody/LayoutBody';
import { deletePasswordState } from '../../store/slice/authSlice';
import React from 'react';

const DashBoard = () => {
    const { data, status } = useSelector((state) => state.projectList);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(deletePasswordState());
    }, [dispatch]);

    return (
        <>
            <div className="ml-4 mr-4 flex">
                <BreadCrumbs title="ダッシュボード" className="pl-2 mt-4 text-blue-50" />
            </div>

            <LayoutBody title="プロジェクト一覧" height="!h-[calc(100vh-168px)]" data={data} status={status} />
        </>
    );
};
export default DashBoard;
