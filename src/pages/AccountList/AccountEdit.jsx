import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import AccountForm from '../../components/Form/AccountForm';
import useGetAccount from '../../hooks/useGetAccount';
import { UnixTsToString } from '../../lib/unixTsToString';

const AccountEdit = () => {
    const { accountId } = useParams();
    const { account, accountError, accountLoading } = useGetAccount(accountId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            <BreadCrumbs
                title={`アカウント > 編集 : ${account?.fullName ? account?.fullName : ''}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <AccountForm
                initialValues={{
                    ...account,
                    roleId: account.roleId || 'k2',
                    isLocked: !account.isLocked, //matched with ui
                    initialPassword: '',
                    passwordExpirationDate: account?.passwordExpirationDate
                        ? UnixTsToString(account.passwordExpirationDate)
                        : '',
                    lastLoginTime: account?.lastLoginTime ? UnixTsToString(account.lastLoginTime) : '',
                    initialState: account.initialState ? '初期状態です' : '初期状態ではありません',
                }}
                load={accountLoading}
                error={accountError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    );
};

export default AccountEdit;
