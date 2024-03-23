import React from 'react';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import ReactTooltipSpan from '../../components/Tooltip/ReactTooltipSpan';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function CategoryListTr({ category }) {
    const navigate = useNavigate();

    return (
        <>
            <tr className="h-8 table-row-bg row-display text-left">
                <td
                    className="w-[20.234rem] px-2 cursor-pointer truncate underline text-blue-200 right-border text-left max-w-[20.234rem]"
                    onClick={() => navigate(`/category_edit/${category.categoryId}`)}
                >
                    {/* <ReactTooltipSpan dataText={category.categoryName && category.categoryName} /> */}
                    <CustomToolTip
                        tooltipContent={
                            <> {category.categoryName && category.categoryName} </>} >
                        {category.categoryName && category.categoryName}
                    </CustomToolTip>
                </td>
                <td className="w-[20.234rem] right-border px-2 cursor-default text-left">
                    {/* <ReactTooltipSpan dataText={category.categoryManageName && category.categoryManageName} /> */}
                    <CustomToolTip
                        tooltipContent={
                            <> {category.categoryManageName && category.categoryManageName} </>} >
                        {category.categoryManageName && category.categoryManageName}
                    </CustomToolTip>
                </td>
                <td className="w-[4rem] px-2 right-border text-center">
                    {category.categoryStatus && category.categoryStatus === 1 ? (
                        <MdOutlineDoNotDisturbAlt className="text-gray-500 ml-[16px]" />
                    ) : (
                        <MdOutlineDoNotDisturbAlt className="text-red-400 ml-[16px]" />
                    )}
                </td>
                <td className="min-w-[10.875rem] px-2 right-border text-left ellipsis max-w-[0]">
                    {/* <ReactTooltipSpan dataText={category.eventName && category.eventName} /> */}
                    <CustomToolTip
                        tooltipContent={
                            <> {category.eventName && category.eventName} </>} >
                        {category.eventName && category.eventName}
                    </CustomToolTip>
                </td>
                <td className="w-[8rem] right-border px-2 text-right">
                    {category.categoryAccessCount && category.categoryAccessCount}
                </td>
                <td className="w-[10.375rem] px-2 right-border cursor-default text-center">
                    {category.updatedAt && UnixTsToString(category.updatedAt)}
                </td>
                <td className="w-[10.375rem] right-border px-2 cursor-default text-center">
                    {category.createdAt && UnixTsToString(category.createdAt)}
                </td>
            </tr>
        </>
    );
}
