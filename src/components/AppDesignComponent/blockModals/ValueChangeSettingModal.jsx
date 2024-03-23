import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import _ from 'lodash';

import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from '../../Modal/components/ModalTitle';
import BlockModalFooter from './BlockModalFooter';
import InputContainer from '../../Wrapper/InputContainer';
import SelectBox from '../../Form/FormInputs/SelectBox';
import { getFieldList } from '../../../services/appDesignerService';
import TextBox from '../../Form/FormInputs/TextBox';
import Note from '../../Form/FormInputs/Note';

const modifyMethods = [
    { id: 1, caption: '指定した値で書き換え' },
    { id: 2, caption: '他のフィールドからコピー' },
];

export default function ValueChangeSettingModal({
    modalTitle = '',
    blockData,
    fieldData,
    setModalOpen = () => {},
    handleOnPressSave = () => {},
}) {
    const { fieldType = '' } = fieldData;

    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('0,1,2,3,5,6,7', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName'])
                    );

                    setFieldList(records);
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchFieldListInit();
    }, []);

    const handleOnchange = (e) => {
        let { name, value, type, checked } = e.target; 

        let finalValue = value;

        if (type == 'checkbox') {
            if (checked) {
                finalValue = Array.isArray(formData.specifiedValue) ? [...formData.specifiedValue, value] : [value];
            } else {
                finalValue = formData.specifiedValue.filter((x) => x != value);
            }
        } else if (type == 'radio') {
            finalValue = value == 'yes' ? 1 : 0;
        } 
        setFormData((prevState) => ({
            ...prevState,
            [name]: finalValue,
        }));
 
    };

 
    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title={`${modalTitle}`} className="text-blue-100" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <div className="flex justify-between space-x-4">
                                    <div className="w-1/2">
                                        <InputContainer>
                                            <SelectBox
                                                label="書き換え方法(LIST型の場合他のフィールドからコピーできません)"
                                                labelClassName="text-blue-100 text-xs"
                                                inputClassName="bg-blue-25"
                                                name="modifyMethod"
                                            >
                                                {modifyMethods.map((x) => (
                                                    <option
                                                        value={x.id}
                                                        key={x.id}
                                                        disabled={fieldType == 3 && x.id == 2}
                                                    >
                                                        {x.caption}
                                                    </option>
                                                ))}
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/2">
                                        {formData.modifyMethod == 2 ? (
                                            <InputContainer>
                                                <SelectBox
                                                    label="コピー元フィールド"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    name="originFieldCode"
                                                >
                                                    <option value="">記録しない</option>
                                                    {fieldList.map((x) => (
                                                        <option key={x.fieldId} value={x.fieldCode}>
                                                            {x.fieldName}
                                                        </option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                        ) : (
                                            <>
                                                {(() => {
                                                    switch (fieldType) {
                                                        case 0:
                                                        case 5:
                                                        case 6:
                                                        case 7:
                                                            let type = 'text';
                                                            if (fieldType == 5) type = 'date';
                                                            else if (fieldType == 6) type = 'time';
                                                            else if (fieldType == 7) type = 'number';

                                                            return (
                                                                <InputContainer>
                                                                    <TextBox
                                                                        label="指定の値(値の入力がない場合空になります)"
                                                                        labelClassName="text-blue-100 text-xs"
                                                                        inputClassName="bg-blue-25"
                                                                        name="specifiedValue"
                                                                        placeholder="指定の値(値の入力がない場合空になります)"
                                                                        type={type}
                                                                    />
                                                                </InputContainer>
                                                            );
                                                        case 1:
                                                            return (
                                                                <InputContainer>
                                                                    <Note
                                                                        label="指定の値(値の入力がない場合空になります)"
                                                                        labelClassName="text-blue-100 text-xs"
                                                                        inputClassName="bg-blue-25 !p-1"
                                                                        height="h-16"
                                                                        name="specifiedValue"
                                                                        placeholder="指定の値(値の入力がない場合空になります)"
                                                                    />
                                                                </InputContainer>
                                                            );
                                                        case 3: // list
                                                            const { lookup = [] } = fieldData.fieldStyle;

                                                            return (
                                                                <>
                                                                    {lookup.map((item) => {
                                                                        const { fieldListCode, inputBox2 = {} } =
                                                                            item || '';

                                                                        return (
                                                                            <div className="flex items-center mr-4">
                                                                                <input
                                                                                    onChange={handleOnchange}
                                                                                    value={fieldListCode}
                                                                                    checked={
                                                                                        Array.isArray(
                                                                                            formData.specifiedValue
                                                                                        ) &&
                                                                                        formData.specifiedValue.includes(
                                                                                            fieldListCode
                                                                                        )
                                                                                    }
                                                                                    id={`vertical-${inputBox2.id}`}
                                                                                    type="checkbox"
                                                                                    name="specifiedValue"
                                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />

                                                                                <label
                                                                                    htmlFor={`vertical-${inputBox2.id}`}
                                                                                    className={`ml-2 labelStyle `}
                                                                                >
                                                                                    管理名：{inputBox2.value}
                                                                                </label>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </>
                                                            );
                                                        case 4: // yes/no
                                                            const { falseText = '', trueText = '' } =
                                                                fieldData.fieldStyle;
                                                            const { specifiedValue } = formData;
                                                            let defaultValue = '';
                                                            if (specifiedValue === 1) {
                                                                defaultValue = 'yes';
                                                            } else if (specifiedValue === 0) {
                                                                defaultValue = 'no';
                                                            }


                                                            return (
                                                                <>
                                                                    <div className="flex items-center mb-4">
                                                                        <input
                                                                            onChange={handleOnchange}
                                                                            id="default-radio-1"
                                                                            type="radio"
                                                                            name="specifiedValue"
                                                                            checked={defaultValue === 'yes'}
                                                                            value="yes"
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        />
                                                                        <label
                                                                            htmlFor="default-radio-1"
                                                                            className={`ml-2 labelStyle`}
                                                                        >
                                                                            管理名：{trueText}
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4">
                                                                        <input
                                                                            onChange={handleOnchange}
                                                                            id="default-radio-2"
                                                                            type="radio"
                                                                            name="specifiedValue"
                                                                            checked={defaultValue === 'no'}
                                                                            value="no"
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        />
                                                                        <label
                                                                            htmlFor="default-radio-2"
                                                                            className={`ml-2 labelStyle`}
                                                                        >
                                                                            管理名：{falseText}
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                })()}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <BlockModalFooter
                            memoFieldShow={false}
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
