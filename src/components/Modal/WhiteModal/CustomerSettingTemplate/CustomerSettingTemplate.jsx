import React, { useEffect, useState } from 'react';
import { baseURL, listField, listMethod } from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import Loading from '../../../Loading/Loader';

import CustomerSettingAddEditTemplate from './CustomerSettingAddEditTemplate';
import CustomerSettingEditTemplate from './CustomerSettingEditTemplate';

export default function CustomerSettingTemplate({
    screenShow,
    modalTitle,
    formType,
    handleCancel,
    blocks = [], // For TreeList
    customerAddTemplateData,
    customerEditTemplateId,
    customerAddTemplateFromType,
    data,
}) {
    const [loading, setLoading] = useState(false);
    const [buttonType, setButtonType] = useState({
        buttonName: 'フィールド追加',
        type: 'F',
        buttonData: [],
        buttonItems: [],
        placeholder: 'フィールド追加',
    });

    useEffect(() => {
        setLoading(true);
        getAllFieldList();
    }, []);

    const getAllFieldList = async () => {
        try {
            setLoading(true);
            const projectId = sessionStorage.getItem('currentProjectId');
            let fieldType = '0,1,2,3,4,5,6,7';
            if (projectId) {
                let addFlag = screenShow == 'add' ? 1 : '';
                const ENDPOINT = `${baseURL}${listField}?pid=${projectId}&fieldType=${fieldType}&addFlag=${addFlag}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response) {
                    const arrayOfFieldList = response?.data?.records;
                    let fieldListDataArrayUpdate = [];
                    if (response?.data?.records) {
                        const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
                        const template = formType == 'edit'?data?.find(template => template.customerEditTemplateId === editId) : [];
                        const selectedItem = template?.customerEditTemplateColumn ?? [];
                        if (arrayOfFieldList.length > 0) {
                            for (let i = 0; i < arrayOfFieldList.length; i++) {
                                const element = arrayOfFieldList[i];
                                const elTask_ID = element.fieldId;
                                let updateElement = {
                                    ...element,
                                    id: element.fieldId,
                                    disabled: false,
                                    text: element.fieldName,
                                };

                                // checking edit has selected f type data is there or not
                                if (selectedItem && selectedItem.length > 0) {
                                    for (let j = 0; j < selectedItem.length; j++) {
                                        const element2 = selectedItem[j];
                                        const fTypeId = element2.fTypeId;

                                        if (elTask_ID == fTypeId) {
                                            updateElement = {
                                                ...element,
                                                id: element.fieldId,
                                                disabled: true,
                                                text: element.fieldName,
                                            };
                                        }
                                    }
                                }

                                fieldListDataArrayUpdate.push(updateElement);
                            }

                            console.log('fieldListDataArrayUpdate', fieldListDataArrayUpdate);
                            setButtonType({
                                ...buttonType,
                                buttonData: fieldListDataArrayUpdate,
                                buttonItem: fieldListDataArrayUpdate,
                            });
                        }
                    }
                    setLoading(false);
                }
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log('Field error', err);
        }
    };

    return (
        <>
            {loading && <Loading />}

            {
                // customer add screen field list add and edit
                screenShow === 'add' && (
                    <CustomerSettingAddEditTemplate
                        modalTitle={modalTitle} // Modal Title
                        handleCancel={handleCancel} //Modal Cancel
                        blocks={blocks}
                        formType={formType}
                        customerAddTemplateData={customerAddTemplateData}
                        customerEditTemplateId={customerEditTemplateId}
                        screenShow={screenShow}
                        customerAddTemplateFromType={customerAddTemplateFromType}
                        buttonType={buttonType}
                        data={data}
                    />
                )
            }
            {
                // customer edit screen field list add and edit
                screenShow === 'edit' && (
                    <CustomerSettingEditTemplate
                        modalTitle={modalTitle}
                        handleCancel={handleCancel}
                        blocks={blocks}
                        formType={formType}
                        customerAddTemplateData={customerAddTemplateData}
                        customerEditTemplateId={customerEditTemplateId}
                        screenShow={screenShow}
                        customerAddTemplateFromType={customerAddTemplateFromType}
                        buttonType={buttonType}
                        data={data}
                    />
                )
            }
        </>
    );
}
