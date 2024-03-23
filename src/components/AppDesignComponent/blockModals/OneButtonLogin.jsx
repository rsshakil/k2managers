import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getSelectedPageData, getTransitionDestinationRouteList } from '../../../store/recoil/appDesignerState';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';
import IconPicker from '../../IconPicker/IconPicker';

import { strokeSizeArray } from '../../../lib/commonConstants';
import { tailwindColorCodeKeys } from "../SettingFormPages/SettingsForm";
import ColorPickerWithRecent from '../../ColorPicker/ColorPickerWithRecent';
import { fontSizeAttributes } from '../../../lib/tailwindClassAttributes';
import { rgbaTohex } from '../../../lib/ColorConvert';

export default function OneButtonLogin({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { } }) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState(blockData);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnChangeIcon(name, icon) {
        // updateState(name, icon, 'info');
        setFormData((prevState) => ({
            ...prevState,
            [name]: icon,
        }));
    }

    const handleOnChangeColor = (name, colorCode, tailwindColorClassKey) => {
        const hex = rgbaTohex(`rgba(${colorCode})`);
        let modifiedValue = `${tailwindColorClassKey}-[${hex}]`;

        setFormData((prevState) => ({
            ...prevState,
            [name]: modifiedValue,
        }));
    }

    const getColorCode = (string = '') => {
        return '#' + string.match(/[a-f0-9]{6}/i);
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="ワンボタンログインブロック設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <TextBox
                                        label="ボタン表示名"
                                        name="buttonText"
                                        placeholder="ボタン表示名"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="ログイン成功時遷移先"
                                        name="successDestination"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData.successDestination}
                                        onChange={handleOnchange}
                                    >
                                        <option value="">なし</option>
                                        {transitionRoutes.map((x) => (
                                            <option key={x.id} value={x.url}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="ログイン失敗時遷移先"
                                        name="failureDestination"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData.failureDestination}
                                        onChange={handleOnchange}
                                    >
                                        <option value="">なし</option>
                                        {transitionRoutes.map((x) => (
                                            <option key={x.id} value={x.url}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="配置ボタンタイプ"
                                        name="buttonType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData.buttonType}
                                        onChange={handleOnchange}
                                    >
                                        <option value="a">A</option>
                                        <option value="b">B</option>
                                        <option value="c">C</option>
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <Note
                                        label="ログインエリアwrapカスタムClass"
                                        name="loginAreaCustomClass"
                                        placeholder="ログインエリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                {/* Spinner */}
                                <div className='flex space-x-4'>
                                    <div className="w-1/2">
                                        <InputContainer>
                                            <SelectBox
                                                label='アイコン1サイズ'
                                                labelClassName='text-blue-100 text-xs'
                                                inputClassName='bg-blue-25'
                                                name={`buttonSpinnerSize`}
                                                value={formData[`buttonSpinnerSize`]}
                                                onChange={(e) => handleOnchange(e, 1)}>
                                                {fontSizeAttributes.map((field, index) => (
                                                    <option
                                                        value={field.value}
                                                        key={field.value + "_" + index}>
                                                        {field.caption}
                                                    </option>
                                                )
                                                )}
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/2">
                                        <InputContainer>
                                            <SelectBox
                                                label='アイコン1strokeサイズ'
                                                labelClassName='text-blue-100 text-xs'
                                                inputClassName='bg-blue-25'
                                                name={`buttonSpinnerStrokeSize`}
                                                value={formData[`buttonSpinnerStrokeSize`]}
                                                onChange={(e) => handleOnchange(e, 1)}
                                            >
                                                {strokeSizeArray.map((field, index) => (
                                                    <option key={field.value} value={field.value} > {field.caption}</option>
                                                ))}
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                </div>
                                <div className="flex customIconsBox space-x-4">
                                    <InputContainer>
                                        <IconPicker
                                            name={`buttonSpinnerSvg`}
                                            value={formData[`buttonSpinnerSvg`]}
                                            width="32px"
                                            height="32px"
                                            iconSize="1.2em"
                                            iconTitle="スピナーアイコン"
                                            path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                                            iconCustomClass="!rounded-none"
                                            iconWrapperCustomClasses="flex flex-row items-center"
                                            titleCustomClasses="ml-2 !mt-0 text-blue-100"
                                            onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <ColorPickerWithRecent
                                            labelClassName="text-[10px] text-blue-100"
                                            setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor)}
                                            inputBoxItem={`buttonSpinnerFillColor`} pickerLabel="アイコンfill色" isBackgroundColor="1"
                                            isDefaultColor={getColorCode(formData[`buttonSpinnerFillColor`])} />
                                    </InputContainer>

                                    <InputContainer>
                                        <ColorPickerWithRecent
                                            labelClassName="text-[10px] text-blue-100"
                                            setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor)}
                                            inputBoxItem={`buttonSpinnerStrokeColor`} pickerLabel="アイコンstroke色" isBackgroundColor="1"
                                            isDefaultColor={getColorCode(formData[`buttonSpinnerStrokeColor`])} />
                                    </InputContainer>
                                </div>
                                <InputContainer>
                                    <TextBox
                                        label="スピナーアイコンWrapカスタムClass"
                                        name={`buttonSpinnerCustomClass`}
                                        placeholder="スピナーアイコンWrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData[`buttonSpinnerCustomClass`]}
                                        onChange={handleOnchange}
                                    />
                                </InputContainer>
                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
