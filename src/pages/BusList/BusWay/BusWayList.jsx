import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../../components/Footer/Footer';
import Loading from '../../../components/Loading/Loader';
import AddButton from '../../../components/Table/FooterSection/AddButton';
import TableControls from '../../../components/Table/TableControls';
import UseTable3 from '../../../components/Table/UseTable3';
import Container from '../../../components/Wrapper/Container';
import useGetBusWay from '../../../hooks/useGetBusWay';
import { ItemData } from '../../../utilities/projectBtnItemData';
import BusWayListTr from './BusWayListTr';

const BusWayList = () => {
    const navigate = useNavigate();
    const { busRouteId } = useParams();
    const recordsLabel = '> ' + sessionStorage?.getItem('busRouteName');
    const [isOverFlow] = useState(false);
    const { headerCells, busWay, busWayLoading } = useGetBusWay(busRouteId); 

    if (headerCells) {
        const { TblContainer, TblHead } = UseTable3(headerCells);
        // 時間の表示フォーマット

        // 条件が複雑なため前に抽出
        const busWayList = () => {
            if (busWay && !headerCells.length) {
                return (
                    <>
                        {busWay.length > 0 &&
                            busWay.map((busRow, index) => (
                                <tr key={index} className="h-8 table-row-bg row-display text-left">
                                    <span>{busRow?.busStopName} </span>
                                </tr>
                            ))}
                    </>
                );
            } else if (busWay.length >= 1) {
                return (
                    <>
                        {busWay &&
                            busWay.map((busRow, index) => index !== 0 && <BusWayListTr key={index} busRow={busRow} />)}
                    </>
                );
            }
        };

        return (
            <div className={`${isOverFlow && 'overflow-hidden'} `}>
                {busWayLoading && <Loading />}
                <Container>
                    <OutlineButtonLinkContainer ItemData={ItemData} />
                    <div className="px-4">
                        {/* ------ Filter section ---------*/}
                        <TableControls.UpperSection>
                            <div className="flex flex-start">
                                <div className="cursor-pointer" onClick={() => navigate('/bus_route_list')}>
                                    <BreadCrumbs
                                        title="バス路線"
                                        className="underline text-blue-50 cursor-pointer font-bold pl-2 pt-px pb-0.5"
                                    />
                                </div>
                                <BreadCrumbs title={recordsLabel} className="text-blue-50 font-bold" />
                            </div>
                        </TableControls.UpperSection>
                        {/* table section */}
                        <div className="table-wrapper">
                            <TblContainer className="!table-auto min-w-[1400px]">
                                <TblHead />
                                <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">{busWayList()}</tbody>
                            </TblContainer>
                        </div>
                        {/* Table Footer Section  */}
                        <Footer>
                            <div className="flex flex-col items-end">
                                <AddButton
                                    text="バス便追加"
                                    onClick={() => {
                                        sessionStorage.setItem('busRouteId', busRouteId);
                                        navigate('/bus_way_add');
                                    }}
                                />
                            </div>
                        </Footer>
                    </div>
                </Container>
            </div>
        );
    }
};

export default BusWayList;
