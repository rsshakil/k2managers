import React, { useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import RoleForm from "../../components/Form/RoleForm";
import Container from "../../components/Wrapper/Container";

const initialValues = {
    roleId: "Int",
    roleName: "",
    isMFAEnabled: true,
    systemManagementAuthority: "Int",
    systemLogAuthority:"Int",
    designManagementAuthority: "Int",
    dataManagementAuthority: "Int",
    categoryManagementAuthority: "Int",
    customerInformationBrowsingAuthority: "Int",
    customerInformationManagementAuthority: "Int",
    csvManagementAuthority: "Int",
    projectManagementAuthority: "Int",
    loginProjectId: "Int",
    roleRelationStyle: {},
    relationProjectId: {},
    relationEventId: {},
    relationInstituteId: {},
    memo: "",
};
const UserRoleAdd = () => {
    const [isOverFlow, setIsOverFlow] = useState(false);
    return (
        <div className={`${isOverFlow && "overflow-hidden"} `}>
        <Container>
            <div className="ml-4 mr-4 flex">
                <BreadCrumbs
                    title="権限・ロール > 新規作成"
                    className="pl-2 mt-4 text-blue-50"
                />
            </div>
            <RoleForm initialValues={initialValues} formType={"add"} setIsOverFlow={setIsOverFlow}/>
        </Container>
        </div>
    );
};
export default UserRoleAdd;
