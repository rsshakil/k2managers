import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';
import utilitiesText from '../../utilities/utilitiesText';

export default function RoleListTr({ role }) {
    console.log('✨✨', role.r12);
    const navigate = useNavigate();

    const { roleList } = utilitiesText;
    function isFullPower(title) {
        return title === 1 ? 'text-orange-300' : '';
    }
    function authorHaveFullPower(codeValue, arrName) {
        if (arrName === 'mfa') {
            return !codeValue ? '' : roleList[arrName][1];
        } else {
            return codeValue && codeValue > 0
                ? roleList.hasOwnProperty(arrName)
                    ? roleList[arrName][codeValue]
                    : ''
                : '';
        }
    }
    return (
        <>
            <tr className="h-8 table-row-bg row-display text-center">
                {/*column roll */}
                {/* -----onclick event has been removed temporarily----*/}
                <td
                    className="min-w-[6rem] right-border pl-2 text-left cell-text-link ellipsis max-w-0"
                    onClick={() => navigate(`/role_edit/${role.roleId}`)}
                >
                    <CustomToolTip tooltipContent={<> {role.roleName && role.roleName}</>}>
                        {role.roleName && role.roleName}
                    </CustomToolTip>
                </td>

                <td className="w-[4rem] right-border text-right pr-2">
                    {role.numberOfAccounts ? role.numberOfAccounts : 0}
                </td>
                {/* column MFA  */}
                <td className="w-[4rem] right-border ellipsis max-w-[4rem]">
                    {/* <ReactTooltipSpan dataText={authorHaveFullPower(role.isMFAEnabled, "mfa")} /> */}
                    <CustomToolTip tooltipContent={<> {authorHaveFullPower(role.isMFAEnabled, 'mfa')}</>}>
                        {authorHaveFullPower(role.isMFAEnabled, 'mfa')}
                    </CustomToolTip>
                </td>
                {/* column system management  */}
                <td className={`${isFullPower(role?.r1)} w-[5rem] right-border`}>
                    {authorHaveFullPower(role?.r1, 'r1')}
                </td>
                {/* column System monitoring (logs)  */}
                <td className={`${isFullPower(role?.r2)} w-[5rem] right-border`}>
                    {authorHaveFullPower(role?.r2, 'r2')}
                </td>
                {/* column APP management (APP, Form, Email, SMS) */}
                <td className={`${isFullPower(role?.r3)} w-[4.5rem] right-border`}>
                    {authorHaveFullPower(role?.r3, 'r3')}
                </td>
                {/* column List of events */}
                <td className={`${isFullPower(role?.r4)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r4, 'r4')}
                </td>
                {/* column Event Scheduler (requires event list permissions) */}
                <td className={`${isFullPower(role?.r5)} w-[4.5rem] right-border`}>
                    {authorHaveFullPower(role?.r5, 'r5')}
                </td>
                {/* column Slots (requires Event Scheduler permissions) */}
                <td className={`${isFullPower(role?.r6)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r6, 'r6')}
                </td>
                {/* column data management  */}
                <td className={`${isFullPower(role?.r7)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r7, 'r7')}
                </td>
                {/* column custom information  */}
                <td className={`${isFullPower(role?.r8)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r8, 'r8')}
                </td>
                {/* column custom management  */}
                <td className={`${isFullPower(role?.r9)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r9, 'r9')}
                </td>
                {/* column CSV export */}
                <td className={`${isFullPower(role?.r10)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r10, 'r10')}
                </td>
                {/* column CSV import */}
                <td className={`${isFullPower(role?.r11)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r11, 'r11')}
                </td>
                <td className={`${isFullPower(role?.r12)} w-[4rem] right-border`}>
                    {authorHaveFullPower(role?.r12, 'r12')}
                </td>
                {/*TODO: change updatedAt to updateTime // column changeDateTime */}
                <td className="w-[9.5rem] right-border">{role.updatedAt && UnixTsToString(role.updatedAt)}</td>
            </tr>
        </>
    );
}
