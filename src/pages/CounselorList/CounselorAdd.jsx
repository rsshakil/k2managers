import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import CounselorForm from '../../components/Form/CounselorForm';
import { ItemData } from '../../utilities/projectBtnItemData';

const initialValues = {
    counselorImageURL1: '',
    counselorImageURL2: '',
    counselorImageURL3: '',
    counselorManageName: '',
    counselorName: '',
    counselorDescription: '',
    counselorOverview: '',
    memo: '',
};

const CounselorAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="カウンセラー > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <CounselorForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default CounselorAdd;
