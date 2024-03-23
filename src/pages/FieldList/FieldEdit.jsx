import React, { useState } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ItemData } from '../../utilities/projectBtnItemData';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import FieldForm from '../../components/Form/FieldForm';
import { useParams } from 'react-router-dom';
import useGetField from '../../hooks/useGetField';
import { UnixTsToString } from '../../lib/unixTsToString';

const FieldEdit = () => {
    const { fieldId } = useParams();
    const { field, fieldLoading, fieldError } = useGetField(fieldId);
    const [isOverFlow, setIsOverFlow] = useState(false);
    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title={`フィールド > 編集 : ${field?.fieldName ? field?.fieldName : ''}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <FieldForm
                fieldStyleDb={field.fieldStyle ? { ...field.fieldStyle } : []}
                initialValues={{
                    ...field,
                    filterId: +field.filterId !== 0 ? field.filterId : '',
                    createdAt: field.createdAt ? UnixTsToString(field.createdAt) : '',
                }}
                load={fieldLoading}
                error={fieldError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    );
};
export default FieldEdit;
