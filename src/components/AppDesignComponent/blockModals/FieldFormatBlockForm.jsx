import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';

import { formType6DropDownItems, formType7DropDownItems } from '../../../lib/commonConstants';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function FieldFormatBlockForm({
    blockData = '',
    setModalOpen = () => {},
    handleOnPressSave = () => {},
}) {
    const [formData, setFormData] = useState(blockData);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="フィールドフォーマット" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-458px)] !p-0">
                            <div className="flex flex-col py-10">
                                {(formData.fieldType == 0 || formData.fieldType == 2) && (
                                    <>
                                        <InputContainer>
                                            <TextBox
                                                label="フィールドフォーマット"
                                                name="formatMethod"
                                                placeholder="例）@@@@-@@@@-@@@@"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>

                                        <p className="text-blue-100 mt-6">
                                            フィールドの文字を先頭から@に置き換えフォーマットします。
                                        </p>
                                        <p className="text-blue-100 mt-2">
                                            フィールドの文字数がフォーマットに指定した文字数より少ないときは置き換えを終了します
                                        </p>
                                    </>
                                )}

                                {formData.fieldType === 1 && (
                                    <>
                                        <p className="text-blue-100 mt-6">改行テキストはフォーマットできません </p>
                                    </>
                                )}
                                {formData.fieldType == 3 && (
                                    <>
                                        <InputContainer>
                                            <SelectBox
                                                label="一個ずつ改行する（最後の一個の後は改行されません） "
                                                name="formatMethod"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                value={formData.formatMethod}
                                                onChange={handleOnchange}
                                            >
                                                <option value="1">改行する</option>
                                                <option value="2">カンマ区切り</option>
                                                <option value="3">全角スペース区切り</option>
                                                <option value="4">半角スペース区切り</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </>
                                )}
                                {formData.fieldType == 4 && (
                                    <>
                                        <InputContainer>
                                            <TextBox
                                                label="Yesの時の表示"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 placeholder-blue-100"
                                                placeholder="例）男性"
                                                name="displayWhenYes"
                                            />
                                        </InputContainer>

                                        <InputContainer>
                                            <TextBox
                                                label="Noの時の表示"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 placeholder-blue-100"
                                                placeholder="例）女性"
                                                name="displayWhenNo"
                                            />
                                        </InputContainer>
                                    </>
                                )}
                                {formData.fieldType == 5 && (
                                    <>
                                        <InputContainer>
                                            <TextBox
                                                label="フィールドフォーマット"
                                                name="formatMethod"
                                                placeholder="例）yyyy年(GGGG年)M月d日"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                        <div className="px-20">
                                            <table className="border-collapse w-full overflow-x-auto table-fixed">
                                                <thead>
                                                    <tr className="h-8 ">
                                                        <th className="sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50">
                                                            種類
                                                        </th>
                                                        <th className="sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50">
                                                            type
                                                        </th>
                                                        <th className="sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50">
                                                            例
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="4">
                                                            元号
                                                        </td>
                                                        <td className=" px-2 right-border text-left">G</td>
                                                        <td className=" px-2 right-border stext-left">昭, 平, 令</td>
                                                    </tr>
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left">GG</td>
                                                        <td className=" px-2 right-border text-left">
                                                            昭和, 平成, 令和
                                                        </td>
                                                    </tr>
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left">GY</td>
                                                        <td className=" px-2 right-border text-left">
                                                            昭30, 平元, 令3
                                                        </td>
                                                    </tr>
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left">GGY</td>
                                                        <td className=" px-2 right-border text-left">
                                                            昭和30, 平成15, 令和3
                                                        </td>
                                                    </tr>
                                                </tbody>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            年
                                                        </td>
                                                        <td className=" px-2 right-border text-left">yy</td>
                                                        <td className=" px-2 right-border text-left">22, 23</td>
                                                    </tr>
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left">yyyy</td>
                                                        <td className=" px-2 right-border text-left">2022, 2023</td>
                                                    </tr>
                                                </tbody>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            月
                                                        </td>
                                                        <td className=" px-2 right-border text-left">M</td>
                                                        <td className=" px-2 right-border text-left">1, 2, ..., 12</td>
                                                    </tr>
                                                    <tr className="h-8   text-left border">
                                                        <td className=" px-2 right-border text-left">MM</td>
                                                        <td className=" px-2 right-border text-left">
                                                            01, 02, ..., 12
                                                        </td>
                                                    </tr>
                                                </tbody>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="1">
                                                            週
                                                        </td>
                                                        <td className=" px-2 right-border text-left">E</td>
                                                        <td className=" px-2 right-border text-left">月火水木金土日</td>
                                                    </tr>
                                                </tbody>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            日
                                                        </td>
                                                        <td className=" px-2 right-border text-left">d</td>
                                                        <td className=" px-2 right-border text-left">1, 2, ..., 31</td>
                                                    </tr>
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left">dd</td>
                                                        <td className=" px-2 right-border text-left">
                                                            01, 02, ..., 31
                                                        </td>
                                                    </tr>
                                                </tbody>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="1">
                                                            午前午後
                                                        </td>
                                                        <td className=" px-2 right-border text-left">a</td>
                                                        <td className=" px-2 right-border text-left">午前,午後</td>
                                                    </tr>
                                                </tbody>

                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            週時間 [1-12]
                                                        </td>
                                                        <td className=" px-2 right-border text-left">h</td>
                                                        <td className=" px-2 right-border text-left">
                                                            1, 2, ..., 11, 12
                                                        </td>
                                                    </tr>
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left">hh</td>
                                                        <td className=" px-2 right-border text-left">
                                                            01, 02, ..., 11, 12
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            時間 [0-23]
                                                        </td>
                                                        <td className=" px-2 right-border text-left">H</td>
                                                        <td className=" px-2 right-border text-left">
                                                            0, 1, 2, ..., 23
                                                        </td>
                                                    </tr>
                                                    <tr className="h-8  text-left border">
                                                        <td className=" px-2 right-border text-left">HH</td>
                                                        <td className=" px-2 right-border text-left">
                                                            00, 01, 02, ..., 23
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            時間 [0-11]
                                                        </td>
                                                        <td className=" px-2 right-border text-left">K</td>
                                                        <td className=" px-2 right-border text-left">
                                                            1, 2, ..., 11, 0
                                                        </td>
                                                    </tr>
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left">KK</td>
                                                        <td className=" px-2 right-border text-left">
                                                            1, 2, ..., 11, 0
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            時間 [1-24]
                                                        </td>
                                                        <td className=" px-2 right-border text-left">k</td>
                                                        <td className=" px-2 right-border text-left">
                                                            24, 1, 2, ..., 23
                                                        </td>
                                                    </tr>
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left">kk</td>
                                                        <td className=" px-2 right-border text-left">
                                                            24, 01, 02, ..., 23
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody className="table-row-bg-custom">
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left" rowSpan="2">
                                                            分
                                                        </td>
                                                        <td className=" px-2 right-border text-left">m</td>
                                                        <td className=" px-2 right-border text-left">0, 1, ..., 59</td>
                                                    </tr>
                                                    <tr className="h-8 text-left border">
                                                        <td className=" px-2 right-border text-left">mm</td>
                                                        <td className=" px-2 right-border text-left">
                                                            00, 01, ..., 59
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                                {formData.fieldType == 6 && (
                                    <>
                                        <InputContainer>
                                            <SelectBox
                                                label="フィールドフォーマット"
                                                name="formatMethod"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                value={formData.formatMethod}
                                                onChange={handleOnchange}
                                            >
                                                {formType6DropDownItems.map((x) => (
                                                    <option key={x.value} value={x.value}>
                                                        {x.caption}
                                                    </option>
                                                ))}
                                            </SelectBox>
                                        </InputContainer>

                                        {/*<div className="px-20">
                                            <table className='border-collapse w-full overflow-x-auto table-fixed'>
                                                <thead>
                                                <tr className='h-8 '>
                                                    <th className='sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50'>種類</th>
                                                    <th className='sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50'>type</th>
                                                    <th className='sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50'>例</th>
                                                </tr>
                                                </thead>
                                                <tbody className="">

                                                <tr className="h-8 table-row-bg text-left border">
                                                    <td className=" px-2 right-border text-left" rowSpan="2">午前午後
                                                    </td>
                                                    <td className=" px-2 right-border text-left">a..aaa</td>
                                                    <td className=" px-2 right-border text-left">AM, PM</td>
                                                </tr>
                                                <tr className="h-8 table-row-bg  text-left border">
                                                    <td className=" px-2 right-border text-left">aaaa</td>
                                                    <td className=" px-2 right-border text-left">a.m., p.m.</td>
                                                </tr>

                                                <tr className="h-8 table-row-bg text-left border">
                                                    <td className=" px-2 right-border text-left" rowSpan="2">週時間
                                                        [1-12]
                                                    </td>
                                                    <td className=" px-2 right-border text-left">h</td>
                                                    <td className=" px-2 right-border text-left">1, 2, ..., 11, 12</td>
                                                </tr>
                                                <tr className="h-8 table-row-bg  text-left border">
                                                    <td className=" px-2 right-border text-left">hh</td>
                                                    <td className=" px-2 right-border text-left">01, 02, ..., 11, 12
                                                    </td>
                                                </tr>

                                                <tr className="h-8 table-row-bg text-left border">
                                                    <td className=" px-2 right-border text-left" rowSpan="2">時間
                                                        [0-23]
                                                    </td>
                                                    <td className=" px-2 right-border text-left">H</td>
                                                    <td className=" px-2 right-border text-left">0, 1, 2, ..., 23</td>
                                                </tr>
                                                <tr className="h-8 table-row-bg  text-left border">
                                                    <td className=" px-2 right-border text-left">HH</td>
                                                    <td className=" px-2 right-border text-left">00, 01, 02, ..., 23
                                                    </td>
                                                </tr>

                                                <tr className="h-8 table-row-bg text-left border">
                                                    <td className=" px-2 right-border text-left" rowSpan="2">時間
                                                        [0-11]
                                                    </td>
                                                    <td className=" px-2 right-border text-left">K</td>
                                                    <td className=" px-2 right-border text-left">1, 2, ..., 11, 0</td>
                                                </tr>
                                                <tr className="h-8 table-row-bg  text-left border">
                                                    <td className=" px-2 right-border text-left">KK</td>
                                                    <td className=" px-2 right-border text-left">1, 2, ..., 11, 0</td>
                                                </tr>

                                                <tr className="h-8 table-row-bg text-left border">
                                                    <td className=" px-2 right-border text-left" rowSpan="2">時間
                                                        [1-24]
                                                    </td>
                                                    <td className=" px-2 right-border text-left">k</td>
                                                    <td className=" px-2 right-border text-left">24, 1, 2, ..., 23</td>
                                                </tr>
                                                <tr className="h-8 table-row-bg  text-left border">
                                                    <td className=" px-2 right-border text-left">kk</td>
                                                    <td className=" px-2 right-border text-left">24, 01, 02, ..., 23
                                                    </td>
                                                </tr>

                                                <tr className="h-8 table-row-bg text-left border">
                                                    <td className=" px-2 right-border text-left" rowSpan="2">分</td>
                                                    <td className=" px-2 right-border text-left">m</td>
                                                    <td className=" px-2 right-border text-left">0, 1, ..., 59</td>
                                                </tr>
                                                <tr className="h-8 table-row-bg  text-left border">
                                                    <td className=" px-2 right-border text-left">mm</td>
                                                    <td className=" px-2 right-border text-left">00, 01, ..., 59</td>
                                                </tr>


                                                </tbody>
                                            </table>
                                        </div>*/}
                                    </>
                                )}
                                {formData.fieldType == 7 && (
                                    <>
                                        <InputContainer>
                                            <SelectBox
                                                label="フィールドフォーマット"
                                                name="formatMethod"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                value={formData.formatMethod}
                                                onChange={handleOnchange}
                                            >
                                                {formType7DropDownItems.map((x) => (
                                                    <option key={x.value} value={x.value}>
                                                        {x.caption}
                                                    </option>
                                                ))}
                                            </SelectBox>
                                        </InputContainer>
                                    </>
                                )}
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
