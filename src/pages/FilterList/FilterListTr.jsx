import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function FilterListTr({ info: { filter } }) {
    const navigate = useNavigate();

    return (
        <>
            <tr className="h-8 table-row-bg row-display">
                <td
                    className="w-[25rem] px-2 cursor-pointer truncate underline text-blue-200 right-border text-left max-w-[25rem]"
                    onClick={() => navigate(`/filter_edit/${filter.filterId}`)}
                >
                    <CustomToolTip tooltipContent={<> {filter.filterName && filter.filterName}</>}>
                        {filter.filterName && filter.filterName}
                    </CustomToolTip>
                </td>
                <td className="w-[30rem] px-2 truncate right-border text-left cursor-default max-w-[30rem]">
                    <CustomToolTip tooltipContent={<> {filter.filterManageName && filter.filterManageName}</>}>
                        {filter.filterManageName && filter.filterManageName}
                    </CustomToolTip>
                </td>
                <td className="min-w-[12rem] px-2 right-border cursor-default text-left truncate max-w-[0]">
                    <CustomToolTip tooltipContent={<> {filter.filterOverview && filter.filterOverview}</>}>
                        {filter.filterOverview && filter.filterOverview}
                    </CustomToolTip>
                </td>
                <td className="w-[10.375rem] px-2 right-border cursor-default text-center">
                    {filter.updatedAt && UnixTsToString(filter.updatedAt)}
                </td>
                <td className="w-[10.375rem] right-border px-2 cursor-default text-center">
                    {filter.createdAt && UnixTsToString(filter.createdAt)}
                </td>
            </tr>
        </>
    );
}
