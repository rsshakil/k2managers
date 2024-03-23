import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import {ItemData} from "../../utilities/projectBtnItemData";
import OutlineButtonLinkContainer from "../../components/Button/OutlineButtonLinkContainer";
import InstituteForm from "../../components/Form/InstituteForm";

const initialValues = {
    instituteCode: '',
    instituteName: '',
    instituteManageName: '',
    instituteOverview : '',
    instituteDescription: '',
    instituteZipCode: '',
    institutePrefecture: '',
    instituteCityName: '',
    instituteTownName: '',
    instituteAddressName: '',
    instituteBuilding: '',
    instituteTelNo: '',
    instituteLatlong: '',
    instituteImageURL1: '',
    instituteImageURL2: '',
    instituteImageURL3: '',
    memo: ''
};
const InstituteAdd = () => {
    return(
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title="施設 > 新規作成"
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <InstituteForm initialValues={initialValues} formType="add"/>
        </>
    )
}
export default InstituteAdd;