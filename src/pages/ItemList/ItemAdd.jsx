import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ItemData } from '../../utilities/projectBtnItemData';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import ItemForm from '../../components/Form/ItemForm';
const initialValues = {
    itemImageURL1: '',
    itemImageURL2: '',
    itemImageURL3: '',
    itemManageName: '',
    itemName: '',
    itemOverview: '',
    itemDescription: '',
    memo: '',
};
const ItemAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="アイテム > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <ItemForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default ItemAdd;
