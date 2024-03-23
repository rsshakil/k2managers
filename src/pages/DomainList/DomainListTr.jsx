import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function DomainListTr({ domain }) {
    const navigate = useNavigate();

    return (
        <>
            <tr className="h-8 table-row-bg row-display text-left">
                <td
                    className="min-w-[14.5rem] right-border pl-2 ellipsis cell-text-link max-w-0"
                    onClick={() => navigate(`/domain_edit/${domain.domainId}`)}
                >
                    {/* Research Code start*/}
                    <CustomToolTip tooltipContent={<>{domain.domainName && domain.domainName}</>}>
                        {domain.domainName && domain.domainName}
                    </CustomToolTip>
                </td>
                <td className="min-w-[24.5rem] right-border pl-2 ellipsis max-w-0">
                    <CustomToolTip tooltipContent={<> {domain.domainURL && domain.domainURL}</>}>
                        {domain.domainURL && domain.domainURL}
                    </CustomToolTip>
                </td>
                <td className="w-[22.25rem] right-border pl-2 text-left ellipsis max-w-[22.25rem]">
                    <CustomToolTip tooltipContent={<>{domain.appName && domain.appName}</>}>
                        {domain.appName && domain.appName}
                    </CustomToolTip>
                </td>

                <td className="w-[10.375rem] right-border text-center">
                    {domain.updatedAt && UnixTsToString(domain.updatedAt)}
                </td>
                <td className="w-[10.375rem] right-border pl-2 text-center">
                    <span className="pr-2">{domain.createdAt && UnixTsToString(domain.createdAt)}</span>
                </td>
            </tr>
        </>
    );
}
