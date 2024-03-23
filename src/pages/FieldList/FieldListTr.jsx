import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function FieldListTr({ field }) {
    const navigate = useNavigate();

    return (
        <>
            <tr className="h-8 table-row-bg row-display text-left">
                <td
                    className="w-[258px] truncate right-border cell-text-link pl-2 max-w-[258px]"
                    onClick={() => navigate(`/field_edit/${field.fieldId}`)}
                    // onMouseEnter={(e) => handleTooltip(e.target)}
                    // onMouseLeave={(e) => setTooltipEnabled(false)}
                >
                    <CustomToolTip tooltipContent={<> {field.fieldName && field.fieldName}</>}>
                        {field.fieldName && field.fieldName}
                    </CustomToolTip>
                    {/* <ReactTooltipSpan dataText={field.fieldName && field.fieldName} /> */}
                </td>
                <td className="w-[258px] truncate text-left right-border px-2 cursor-default max-w-[258px]">
                    <CustomToolTip tooltipContent={<> {field.fieldManageName && field.fieldManageName}</>}>
                        {field.fieldManageName && field.fieldManageName}
                    </CustomToolTip>
                    {/* <ReactTooltipSpan dataText={field.fieldManageName && field.fieldManageName} /> */}
                </td>
                <td className="w-[212px] truncate right-border px-2">
                    {field.fieldType === 0
                        ? 'テキスト型'
                        : '' || field.fieldType === 1
                        ? 'テキストエリア型'
                        : // : "" || field.fieldType === 2
                        //   ? "結合テキスト型"
                        '' || field.fieldType === 3
                        ? 'リスト型'
                        : '' || field.fieldType === 4
                        ? 'YesNo型'
                        : '' || field.fieldType === 5
                        ? '日付型'
                        : '' || field.fieldType === 6
                        ? '時間型'
                        : '' || field.fieldType === 7
                        ? '数値型'
                        : ''}
                </td>
                <td
                    className="min-w-[345px] truncate right-border px-2 max-w-0"
                    // onMouseEnter={(e) => handleTooltip(e.target)}
                    // onMouseLeave={(e) => setTooltipEnabled(false)}
                >
                    <CustomToolTip tooltipContent={<> {field.fieldOverview && field.fieldOverview}</>}>
                        {field.fieldOverview && field.fieldOverview}
                    </CustomToolTip>
                    {/* <ReactTooltipSpan dataText={field.fieldOverview && field.fieldOverview} /> */}
                </td>

                <td className="w-[166px] text-center right-border px-2">
                    {field.updatedAt && UnixTsToString(field.updatedAt)}
                </td>
                <td className="w-[166px] text-center right-border px-2">
                    {field.createdAt && UnixTsToString(field.createdAt)}
                </td>
            </tr>
        </>
    );
}
