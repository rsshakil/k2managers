import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import ReactTooltipSpan from '../../components/Tooltip/ReactTooltipSpan';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function CounselorListTr({ counselor }) {
    const navigate = useNavigate();

    return (
        <tr className="h-8 table-row-bg row-display text-left">
            <td className="w-[10rem] px-2 right-border text-center">
                <div className="bg-contain">
                    {(() => {
                        if (counselor.counselorImageURL1) {
                            return (
                                <div
                                    className="img-center"
                                    style={{
                                        backgroundImage: `url(${counselor.counselorImageURL1})`,
                                    }}
                                ></div>
                            );
                        } else if (counselor.counselorImageURL2) {
                            return (
                                <div
                                    className="img-center"
                                    style={{
                                        backgroundImage: `url(${counselor.counselorImageURL2})`,
                                    }}
                                ></div>
                            );
                        } else if (counselor.counselorImageURL3) {
                            return (
                                <div
                                    className="img-center"
                                    style={{
                                        backgroundImage: `url(${counselor.counselorImageURL3})`,
                                    }}
                                ></div>
                            );
                        }
                    })()}
                </div>
            </td>
            <td
                className="w-[18rem] px-2 cursor-pointer truncate underline text-blue-200 right-border text-left max-w-[18rem]"
                onClick={() => navigate(`/counselor_edit/${counselor.counselorId}`)}
            >
                {/* <ReactTooltipSpan dataText={counselor.counselorName} /> */}
                <CustomToolTip
                    tooltipContent={
                        <>{counselor?.counselorName}</>} >
                    {counselor?.counselorName}
                </CustomToolTip>
            </td>
            <td className="w-[18rem] px-2 right-border cursor-default text-left truncate max-w-[18rem]">
                {/* <ReactTooltipSpan dataText={counselor.counselorManageName} /> */}
                <CustomToolTip
                    tooltipContent={
                        <>{counselor?.counselorManageName} </>} >
                    {counselor?.counselorManageName}
                </CustomToolTip>
            </td>
            <td className="min-w-[17.5rem] px-2 right-border cursor-default text-left truncate max-w-[0]">
                {/* <ReactTooltipSpan dataText={counselor.counselorOverview} /> */}
                <CustomToolTip
                    tooltipContent={
                        <>{counselor?.counselorOverview}</>} >
                    {counselor?.counselorOverview}
                </CustomToolTip>
            </td>
            <td className="w-[10rem] px-2 right-border cursor-default text-center">
                {counselor.updatedAt && UnixTsToString(counselor.updatedAt)}
            </td>
            <td className="w-[10rem] right-border px-2 cursor-default text-center">
                {counselor.createdAt && UnixTsToString(counselor.createdAt)}
            </td>
        </tr>
    );
}
