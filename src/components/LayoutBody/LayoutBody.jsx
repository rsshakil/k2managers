import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { LiLink, UlContainer } from '../../pages/LayoutTemplate/ListLink';
import { makeProjectID } from '../../store/slice/projectListSlice';
import Loading from '../Loading/Loader';

const LayoutBody = ({ title, data, component, height, status }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role) || {}; 

    if (status === 'pending') return <Loading />;

    let toLink = ''; 
    if (role.r3 == 1) {
        toLink = '/app_list';
    } else if (role.r4 >= 1) {
        toLink = '/event_list';
    } else if (role.r7 == 1) {
        toLink = '/category_list';
    } else if (role.r8 >= 1) {
        toLink = '/customer_list';
    } else if (role.r10 >= 1) {
        toLink = '/csv_export_list';
    } else if (role.r11 >= 1) {
        toLink = '/csv_import_list';
    } else if (role.r12 == 1) {
        toLink = '/broadcast_list';
    }
console.log('data',data);
    return (
        <div className="relative flex justify-center flex-col items-center">
            <div className="wrap min-w-[1440px]">
                <div className="p-2 page1440">
                    <label className="text-blue-100 font-normal">{title}</label>
                    <div
                        className={`ml-[4rem] leading-8 font-normal h-[calc(100vh-192px)] overscroll-auto overlay scroll-bar ${height}`}
                    >
                        {component && component}
                        <UlContainer>
                            {data &&
                                data.map(
                                    (link, index) =>
                                        link.projectStatus === 1 && (
                                            <LiLink
                                                text={link.projectName}
                                                key={index}
                                                onClick={() => {
                                                    link?.projectId && sessionStorage.setItem('currentProjectId', link.projectId);
                                                    sessionStorage.setItem('projectCsvCharacterCode', link.projectCsvCharacterCode);
                                                    link?.projectName && sessionStorage.setItem('currentProjectName', link.projectName);
                                                    navigate(toLink);
                                                }}
                                            />
                                        )
                                )}
                        </UlContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutBody;
