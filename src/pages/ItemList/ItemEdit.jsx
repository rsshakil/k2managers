import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItemData } from '../../utilities/projectBtnItemData';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ItemForm from '../../components/Form/ItemForm';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import useGetItem from '../../hooks/useGetItem';

const ItemEdit = () => {
    const { itemId } = useParams();
    const { item, itemError, itemLoading } = useGetItem(itemId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title={`アイテム > 編集 : ${item?.itemName ? item?.itemName : ''}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <ItemForm
                initialValues={{ ...item }}
                load={itemLoading}
                error={itemError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    );
};
export default ItemEdit;
