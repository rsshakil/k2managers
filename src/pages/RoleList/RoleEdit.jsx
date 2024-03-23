import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import RoleForm from '../../components/Form/RoleForm';
import Container from '../../components/Wrapper/Container';
import useGetRole from '../../hooks/useGetRole';

const UserRoleEdit = () => {
    const [isOverFlow, setIsOverFlow] = useState(false);
    const { roleId } = useParams();
    const { role, roleError, roleLoading } = useGetRole(roleId);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            <Container>
                <div className="ml-4 mr-4 flex">
                    <BreadCrumbs
                        title={`権限・ロール > 編集 : ${role?.roleName ? role?.roleName : ''}`}
                        className="pl-2 mt-4 text-blue-50"
                    />
                </div>
                <RoleForm
                    initialValues={{
                        ...role,
                        isMFAEnabled: +role.isMFAEnabled ? false : true,
                        r1: +role.r1 === 1 ? true : false,
                        r2: +role.r2 === 1 ? true : false,
                        r3: +role.r3 === 1 ? true : false,
                        r4: +role.r4 === 2 ? true : false, //Parent
                        c4: +role.r4 === 1 ? true : false, //Child --
                        r5: +role.r5 === 2 ? true : false, //Parent
                        c5: +role.r5 === 1 ? true : false, //Child --
                        r6: +role.r6 === 2 ? true : false, //Parent
                        c6: +role.r6 === 1 ? true : false, //Child --
                        r7: +role.r7 === 2 ? true : false,
                        c7: +role.r7 === 1 ? true : false,
                        r8: +role.r8 === 2 ? true : false, //Parent
                        c8: +role.r8 === 1 ? true : false, //Child --
                        r9: +role.r9 === 2 ? true : false, //Parent
                        c9: +role.r9 === 1 ? true : false, //Child --
                        r10: +role.r10 === 2 ? true : false,
                        c10: +role.r10 === 1 ? true : false,
                        r11: +role.r11 === 2 ? true : false,
                        c11: +role.r11 === 1 ? true : false,
                        r12: +role.r12 === 1 ? true : false,
                        limitType: +role?.roleRelationStyle?.limitType === 0 ? 0 : 1,
                        numberOfAccounts: +role.numberOfAccounts ? +role.numberOfAccounts : 0,
                    }}
                    formType={'edit'}
                    load={roleLoading}
                    error={roleError}
                    setIsOverFlow={setIsOverFlow}
                />
            </Container>
        </div>
    );
};
export default UserRoleEdit;
