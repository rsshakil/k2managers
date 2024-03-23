import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';

import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { fullWidthNumber } from '../../../lib/commonConstants';
import ColorPickerWithRecent from '../../ColorPicker/ColorPickerWithRecent';
import Note from '../../Form/FormInputs/Note';
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';

import {
    borderAttributes,
    fontSizeAttributes,
    fontWeightAttributes,
    letterSpacingAttributes,
    positionAttributes,
    textAlignAttributes,
    verticalAlignAttributes,
} from '../../../lib/tailwindClassAttributes';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';

const Step1Settings = ({
    formData: initialValues,
    handleOnChange,
    handleOnChangeColor = () => {},
    tailwindColorCodeKeys,
}) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const screenSize = {
        1: 'default',
        2: 'sm',
        3: 'md',
        4: 'lg',
        5: 'xl',
        6: '2xl',
    };
    const formDataJson = tabItems[activeTab].appSettingQuery[activePageId];
    let stepTitleNo =
        activePageId == 'step1Settings'
            ? fullWidthNumber[1]
            : activePageId == 'step2Settings'
            ? fullWidthNumber[2]
            : fullWidthNumber[3];
    useEffect(() => {
        if (Array.isArray(initialValues?.stepBoxText)) {
            let stepBoxes = {};
            initialValues?.stepBoxText.length > 0 &&
                initialValues?.stepBoxText.map((stepItem, i) => {
                    let stepBox = `step${i + 1}`;
                    let newStepBoxPrepare = {};
                    for (var j = 1; j <= 6; j++) {
                        let objK = screenSize[j];
                        newStepBoxPrepare[objK] = stepItem?.text ?? '';
                    }
                    stepBoxes[stepBox] = newStepBoxPrepare;
                });
            setRecoilState((prevState) => ({
                ...prevState,
                tabItems: {
                    ...prevState.tabItems,
                    settings: {
                        appSettingQuery: {
                            ...prevState.tabItems.settings.appSettingQuery,
                            [activePageId]: {
                                ...prevState.tabItems.settings.appSettingQuery[activePageId],
                                info: {
                                    ...prevState.tabItems.settings.appSettingQuery[activePageId].info,
                                    stepBoxText: stepBoxes,
                                },
                            },
                        },
                    },
                },
            }));
        } else {
            console.log('its new object');
        }
    }, []);

    function handleOnChangePrefix(e, attr) {
        let attrName = e.target.name;
        let attrValue = e.target.value;
        let getAttrNameFromArr = attrName.split('.');
        let objName = getAttrNameFromArr[0];
        let objIndex = getAttrNameFromArr[1];

        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery[activePageId].prefixClass[objName][objIndex] =
            attrValue;

        setRecoilState(currentStateDataUpdate);
    }

    const handleChangeLoopField = async (e) => {
        let attrName = e.target.name;
        let attrValue = e.target.value;
        let getAttrNameFromArr = attrName.split('.');
        let objName = getAttrNameFromArr[0];
        let objIndex = getAttrNameFromArr[1];
        let objKeyName = getAttrNameFromArr[2];
        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                settings: {
                    appSettingQuery: {
                        ...prevState.tabItems.settings.appSettingQuery,
                        [activePageId]: {
                            ...prevState.tabItems.settings.appSettingQuery[activePageId],
                            info: {
                                ...prevState.tabItems.settings.appSettingQuery[activePageId].info,
                                stepBoxText: {
                                    ...prevState.tabItems.settings.appSettingQuery[activePageId].info.stepBoxText,
                                    [objIndex]: {
                                        ...prevState.tabItems.settings.appSettingQuery[activePageId].info.stepBoxText[
                                            objIndex
                                        ],
                                        [objKeyName]: attrValue,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }));
    };

    function textBoxElement(stepInputNo, stepBoxNo) {
        let labelText = '';
        let labelName = 'default';
        switch (stepInputNo) {
            case 1:
                labelText = '無指定';
                labelName = 'default';
                break;
            case 2:
                labelText = '640px以上';
                labelName = 'sm';
                break;
            case 3:
                labelText = '768px以上';
                labelName = 'md';
                break;
            case 4:
                labelText = '1024px以上';
                labelName = 'lg';
                break;
            case 5:
                labelText = '1280px以上';
                labelName = 'xl';
                break;
            case 6:
                labelText = '1536px以上';
                labelName = '2xl';
                break;
        }
        return (
            <InputContainer>
                <Note
                    label={labelText}
                    labelClassName="text-blue-100 text-xs"
                    inputClassName="bg-blue-25"
                    type="text"
                    maxLength="16"
                    onBlur={handleChangeLoopField}
                    name={`stepBoxText.step${stepBoxNo}.${labelName}`}
                    placeholder={`ステップテキスト`}
                />
            </InputContainer>
        );
    }

    return (
        <Formik
            onSubmit=""
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialValues}
        >
            <div className="relative w-full">
                <Form>
                    <div>
                        <InputContainer>
                            <SelectBox
                                label={` ステップ${stepTitleNo}ステップ数`}
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="quantity"
                                onChange={(e) => handleOnChange(e, 4)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ステップ${stepTitleNo}線の太さ`}
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="borderWidth"
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {borderAttributes.length > 0 &&
                                    borderAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ステップ${stepTitleNo}エリア固定`}
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="position"
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {positionAttributes.length > 0 &&
                                    positionAttributes.map((field, index) => (
                                        <option
                                            // selected={pageFrameData.headerBorderWidth == field.value?'true':field?.isSelected}
                                            value={field.value}
                                            key={field.value + '_' + index}
                                        >
                                            {field.caption}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>

                        <div className="flex justify-between mt-12 space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字揃え：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.textAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {textAlignAttributes.length > 0 &&
                                        textAlignAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字揃え：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.textAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {textAlignAttributes.length > 0 &&
                                        textAlignAttributes.map((field, index) => (
                                            <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字揃え：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.textAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {textAlignAttributes.length > 0 &&
                                        textAlignAttributes.map((field, index) => (
                                            <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字揃え：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.textAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {textAlignAttributes.length > 0 &&
                                        textAlignAttributes.map((field, index) => (
                                            <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字揃え：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.textAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {textAlignAttributes.length > 0 &&
                                        textAlignAttributes.map((field, index) => (
                                            <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字揃え：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.textAlign"
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {textAlignAttributes.length > 0 &&
                                        textAlignAttributes.map((field, index) => (
                                            <option value={`2xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex mt-4 justify-between space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="垂直整列：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.verticalAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {verticalAlignAttributes.length > 0 &&
                                        verticalAlignAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="垂直整列：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.verticalAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {verticalAlignAttributes.length > 0 &&
                                        verticalAlignAttributes.map((field, index) => (
                                            <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="垂直整列：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.verticalAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {verticalAlignAttributes.length > 0 &&
                                        verticalAlignAttributes.map((field, index) => (
                                            <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="垂直整列：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.verticalAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {verticalAlignAttributes.length > 0 &&
                                        verticalAlignAttributes.map((field, index) => (
                                            <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="垂直整列：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.verticalAlign"
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {verticalAlignAttributes.length > 0 &&
                                        verticalAlignAttributes.map((field, index) => (
                                            <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="垂直整列：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.verticalAlign"
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {verticalAlignAttributes.length > 0 &&
                                        verticalAlignAttributes.map((field, index) => (
                                            <option value={`2xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字サイズ：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.textSize"
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {fontSizeAttributes.length > 0 &&
                                        fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字サイズ：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.textSize"
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {fontSizeAttributes.length > 0 &&
                                        fontSizeAttributes.map((field, index) => (
                                            <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字サイズ：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.textSize"
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {fontSizeAttributes.length > 0 &&
                                        fontSizeAttributes.map((field, index) => (
                                            <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字サイズ：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.textSize"
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {fontSizeAttributes.length > 0 &&
                                        fontSizeAttributes.map((field, index) => (
                                            <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字サイズ：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.textSize"
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {fontSizeAttributes.length > 0 &&
                                        fontSizeAttributes.map((field, index) => (
                                            <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字サイズ：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.textSize"
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {fontSizeAttributes.length > 0 &&
                                        fontSizeAttributes.map((field, index) => (
                                            <option value={`2xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex mt-4 justify-between space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字太さ：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.textWeight"
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {fontWeightAttributes.length > 0 &&
                                        fontWeightAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字太さ：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.textWeight"
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {fontWeightAttributes.length > 0 &&
                                        fontWeightAttributes.map((field, index) => (
                                            <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字太さ：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.textWeight"
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {fontWeightAttributes.length > 0 &&
                                        fontWeightAttributes.map((field, index) => (
                                            <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字太さ：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.textWeight"
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {fontWeightAttributes.length > 0 &&
                                        fontWeightAttributes.map((field, index) => (
                                            <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字太さ：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.textWeight"
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {fontWeightAttributes.length > 0 &&
                                        fontWeightAttributes.map((field, index) => (
                                            <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字太さ：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.textWeight"
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {fontWeightAttributes.length > 0 &&
                                        fontWeightAttributes.map((field, index) => (
                                            <option value={`2xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字字間：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.letterSpacing"
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {letterSpacingAttributes.length > 0 &&
                                        letterSpacingAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字字間：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.letterSpacing"
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {letterSpacingAttributes.length > 0 &&
                                        letterSpacingAttributes.map((field, index) => (
                                            <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字字間：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.letterSpacing"
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {letterSpacingAttributes.length > 0 &&
                                        letterSpacingAttributes.map((field, index) => (
                                            <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字字間：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.letterSpacing"
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {letterSpacingAttributes.length > 0 &&
                                        letterSpacingAttributes.map((field, index) => (
                                            <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字字間：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.letterSpacing"
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {letterSpacingAttributes.length > 0 &&
                                        letterSpacingAttributes.map((field, index) => (
                                            <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <InputContainer className="w-1/3 mb-4">
                                <SelectBox
                                    label="文字字間：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.letterSpacing"
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {letterSpacingAttributes.length > 0 &&
                                        letterSpacingAttributes.map((field, index) => (
                                            <option value={`2xl:${field.value}`} key={field.value + '_' + index}>
                                                {field.caption}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        {_.range(initialValues?.quantity).map((y) => (
                            // <InputContainer>
                            //     <TextBox label={`ステップ${stepTitleNo}BOX${index + 1}テキスト（16文字まで）`}
                            //         labelClassName='text-blue-100 text-xs'
                            //         inputClassName='bg-blue-25'
                            //         name={`stepBoxText.${index}.text`}
                            //         onBlur={handleChangeLoopField}
                            //         //value={field.value}
                            //         placeholder={`BOX${index + 1}テキスト`}
                            //         maxLength='16'
                            //         type="text" />
                            // </InputContainer>
                            <>
                                <label
                                    htmlFor="headerAreaShadow"
                                    className="flex flex-col text-blue-100 mb-4 mt-4 text-xs"
                                >
                                    BOX{y + 1}テキスト（16文字まで）
                                </label>
                                <div class="grid grid-cols-3 gap-4">
                                    {_.range(6).map((x) => textBoxElement(x + 1, y + 1))}
                                </div>
                            </>
                        ))}

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">
                                ステップ{stepTitleNo} 配色 活性時
                            </label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(
                                            name,
                                            colorCode,
                                            tailwindColorCodeKeys.backgroundColor,
                                            [1, 2]
                                        )
                                    }
                                    inputBoxItem="activeBackgroundColor"
                                    pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.activeBackgroundColor}
                                />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])
                                    }
                                    inputBoxItem="activeBorderColor"
                                    pickerLabel="線色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.activeBorderColor}
                                />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                    }
                                    inputBoxItem="activeTextColor"
                                    pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.activeTextColor}
                                />

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                    }
                                    inputBoxItem="activeExplanationTextColor"
                                    pickerLabel="説明文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.activeExplanationTextColor}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">
                                ステップ{stepTitleNo} 配色 非活性時
                            </label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(
                                            name,
                                            colorCode,
                                            tailwindColorCodeKeys.backgroundColor,
                                            [1, 2]
                                        )
                                    }
                                    inputBoxItem="disableBackgroundColor"
                                    pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.disableBackgroundColor}
                                />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])
                                    }
                                    inputBoxItem="disableBorderColor"
                                    pickerLabel="線色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.disableBorderColor}
                                />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                    }
                                    inputBoxItem="disableTextColor"
                                    pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.disableTextColor}
                                />

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) =>
                                        handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                    }
                                    inputBoxItem="disableExplanationTextColor"
                                    pickerLabel="説明文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialValues.disableExplanationTextColor}
                                />
                            </div>
                        </div>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />
                        <InputContainer>
                            <TextBox
                                label={`ステップ${stepTitleNo}　WrapカスタムClass`}
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="wrapCustomClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder="カスタムClass"
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer className="!mb-0">
                            <TextBox
                                label={`ステップ${stepTitleNo}　BOXカスタムClass`}
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="boxCustomClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder="カスタムClass"
                                type="text"
                            />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    );
};
export default Step1Settings;
