import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function AccountListTr({ account }) {
    const navigate = useNavigate();

    return (
        <>
            <tr className="h-8 table-row-bg row-display text-left">
                {/* :: Edit Account :: */}
                <td
                    className="w-[13rem] right-border pl-2 ellipsis max-w-[13rem] cell-text-link"
                    onClick={() => navigate(`/account_edit/${account.accountId}`)}
                >
                    {/* {account.accountId && account.accountId} */}
                    <CustomToolTip
                        tooltipContent={
                            <> {account.accountId && account.accountId}</>} >
                        {account.accountId && account.accountId}
                    </CustomToolTip>
                </td>
                <td className="w-[13rem] right-border pl-2 ellipsis max-w-[13rem]">
                    {/* {account.fullName && account.fullName} */}
                    <CustomToolTip
                        tooltipContent={
                            <> {account.fullName && account.fullName}</>} >
                        {account.fullName && account.fullName}
                    </CustomToolTip>
                </td>
                <td className="min-w-[10rem] right-border pl-2 ellipsis max-w-0">
                    {/* {account.email && account.email} */}
                    <CustomToolTip
                        tooltipContent={
                            <> {account.email && account.email}</>} >
                        {account.email && account.email}
                    </CustomToolTip>
                </td>
                <td className="w-[13rem] right-border pl-2 ellipsis max-w-[13rem]">
                    {/* {account.roleName && account.roleName} */}
                    <CustomToolTip
                        tooltipContent={
                            <> {account.roleName && account.roleName}</>} >
                        {account.roleName && account.roleName}
                    </CustomToolTip>
                </td>
                <td className="w-[10.375rem] right-border ellipsis max-w-[10.375rem] text-center">
                    {account.passwordExpirationDate === 0 || account.passwordExpirationDate
                        ? UnixTsToString(account.passwordExpirationDate)
                        : ''}
                </td>
                <td className="w-[10.375rem] right-border ellipsis max-w-[10.375rem] text-center">
                    {account.lastLoginTime && account.lastLoginTime > 0 ? UnixTsToString(account.lastLoginTime) : ''}
                </td>
                <td className="w-[7rem] right-border pr-2 ellipsis max-w-[7rem] text-right">
                    {account.lastLoginFailureCount ? account.lastLoginFailureCount : 0}
                </td>
                <td className="w-[5rem] right-border">
                    {(account.initialState || account.isLocked !== 0) && (
                        <span className="text-green-300 flex justify-center">
                            <FaCircle />
                        </span>
                    )}
                </td>
                <td className="w-[6rem]">
                    {(account.isLocked || account.isLocked !== 0) && (
                        <span className="text-orange-300 flex justify-center">
                            <FaCircle />
                        </span>
                    )}
                </td>
            </tr>
        </>
    );
}
