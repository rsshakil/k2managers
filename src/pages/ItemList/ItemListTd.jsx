import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function ItemListTd({ item }) {
    const navigate = useNavigate();

    return (
        <>
            <td
                className="w-[18.25rem] px-2 cursor-pointer underline text-blue-200 right-border text-left max-w-[18.25rem]"
                onClick={() => navigate(`/item_edit/${item.itemId}`)}
            >
                <CustomToolTip tooltipContent={<> {item?.itemName}</>}>{item?.itemName}</CustomToolTip>
            </td>
            <td className="w-[18.25rem] px-2 cursor-default right-border text-left max-w-[18.25rem]">
                <CustomToolTip tooltipContent={<> {item?.itemManageName}</>}>{item?.itemManageName}</CustomToolTip>
            </td>
            <td className="min-w-[28rem] px-2 right-border cursor-default text-left max-w-[0]">
                <CustomToolTip tooltipContent={<> {item?.itemOverview}</>}>{item?.itemOverview}</CustomToolTip>
            </td>
            <td className="w-[10.375rem] px-2 right-border cursor-default text-center">
                {item.updatedAt && UnixTsToString(item.updatedAt)}
            </td>
            <td className="w-[10.375rem] right-border px-2 cursor-default text-center">
                {item.createdAt && UnixTsToString(item.createdAt)}
            </td>
        </>
    );
}
