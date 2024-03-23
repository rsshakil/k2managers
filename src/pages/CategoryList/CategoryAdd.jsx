import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import CategoryForm from '../../components/Form/CategoryForm';
import { ItemData } from '../../utilities/projectBtnItemData';

const initialValues = {
    categoryImageURL1: '',
    categoryImageURL2: '',
    categoryImageURL3: '',
    categoryName: '',
    categoryManageName: '',
    categoryOverview: '',
    categoryDescription: '',
    categoryDescription2: '',
    categoryStatus: true,
    memo: '',
};

const CategoryAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="予約カテゴリー > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <CategoryForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default CategoryAdd;
