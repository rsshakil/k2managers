import React from 'react';
import ReactTooltip from 'react-tooltip';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import ReactTooltipSpan from '../../components/Tooltip/ReactTooltipSpan';
import useOverLayTooltips from '../../hooks/useOverLayTooltips';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function ProjectListTr({ info: { project, handleProjectEdit } }) {
    return (
        <>
            <tr className="h-8 table-row-bg row-display text-left">
                <td
                    className="min-w-[36rem] right-border pl-2 ellipsis cell-text-link max-w-0"
                    onClick={() => handleProjectEdit(project.projectId)}
                >
                    <CustomToolTip tooltipContent={<>{project.projectName && project.projectName}</>}>
                        {project.projectName && project.projectName}
                    </CustomToolTip>
                </td>
                <td className="w-[18rem] right-border pl-2 text-left">{project.projectCode && project.projectCode}</td>
                <td
                    className={`w-[6rem] right-border text-center ${
                        project.projectStatus === 1 ? '' : 'text-orange-300'
                    }`}
                >
                    {project.projectStatus && project.projectStatus === 1 ? '稼働中' : '停止中'}
                </td>

                <td className="w-[10.5rem] right-border text-center">
                    {project.updatedAt && UnixTsToString(project.updatedAt)}
                </td>
                <td className="w-[10.5rem] right-border pl-2 text-center">
                    <span className="pr-2">{project.createdAt && UnixTsToString(project.createdAt)}</span>
                </td>
            </tr>
        </>
    );
}
