import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ItemData } from '../../utilities/projectBtnItemData';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import FilterForm from '../../components/Form/FilterForm';

const initialValues = {
    filterName: '',
    filterManageName: '',
    filterOverview: '',
    filterQuery: '',
    filterParam: '',
    memo: '',
};
const FilterAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="フィルター > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <FilterForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default FilterAdd;
