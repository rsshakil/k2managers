import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import CategoryForm from '../../components/Form/CategoryForm';
import Loader from '../../components/Loading/Loader';
import useGetCategory from '../../hooks/useGetCategory';
import { ItemData } from '../../utilities/projectBtnItemData';

const CategoryEdit = () => {
    const { categoryId } = useParams();
    const { category, categoryError, categoryLoading } = useGetCategory(categoryId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {/* FIXME: If you are in the project, you should fix it so that it is displayed in common. */}
            {categoryLoading ? (
                <Loader />
            ) : (
                <>
                    <OutlineButtonLinkContainer ItemData={ItemData} />
                    <BreadCrumbs
                        title={`予約カテゴリー > 編集 : ${category?.categoryName ? category?.categoryName : ''}`}
                        className="mt-4 text-blue-50 font-bold px-4"
                    />
                    <CategoryForm
                        initialValues={{
                            ...category,
                            categoryStatus: category?.categoryStatus === 1 ? true : false,
                        }}
                        load={categoryLoading}
                        error={categoryError}
                        formType="edit"
                        setIsOverFlow={setIsOverFlow}
                    />
                </>
            )}
        </div>
    );
};
export default CategoryEdit;
