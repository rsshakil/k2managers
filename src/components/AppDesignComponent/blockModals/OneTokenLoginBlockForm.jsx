import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import { getTransitionDestinationRouteList } from "../../../store/recoil/appDesignerState";
import { valueFormatCheck } from "../../../utilities/commonFunctions";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";
import TokenLoginInputOptions from "./TokenLoginInputOptions";


export default function OneTokenLoginBlockForm({ blockData = '', divisionNumber = '', setModalOpen = () => { }, handleOnPressSave = () => { } }) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState(blockData);
 
    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    let numField = Array.from({ length: formData.divisionNumber }, (_, i) => i + 1);
    let areaInputTypeValueList = [
        formData.area1InputType, formData.area2InputType, formData.area3InputType, formData.area4InputType
    ];

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="1トークンログインブロック設定（トークン１でログインします）" className="text-blue-100 text-xl" />

            <Formik
                enableReinitialize={true}
                initialValues={formData}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <TextBox label="ボタン表示名"
                                        name="buttonText"
                                        placeholder="ボタン表示名"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25'
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
                                        {transitionRoutes.map(x => <option key={x.id} value={x.url}>{x.name}</option>)}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label="ログイン失敗時表示文言"
                                        name="failureMessage"
                                        placeholder="ログイン失敗時表示文言"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25'
                                    />
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
                                    <Note label="ログインエリアwrapカスタムClass"
                                        name="loginAreaCustomClass"
                                        placeholder="ログインエリアwrapカスタムClass"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label="文字数不足時バリデート文言"
                                        name="formErrorMessage"
                                        placeholder="文字数不足時バリデート文言"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25'
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="入力エリア分割数（1トークンログイン設定ページの設定値）"
                                        name="divisionNumber"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                        readOnly
                                        tabIndex="-1"
                                    />

                                </InputContainer>

                                {numField.length > 0 && numField.map((number, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex px-8" >
                                            <div className="w-1/5 px-1">
                                                <InputContainer>
                                                    <SelectBox
                                                        label={`入力エリア${number}文字数（不足時バリデート）`}
                                                        name={`area${number}TextLength`}
                                                        labelClassName="text-blue-100 text-[12px]"
                                                        inputClassName="bg-blue-25"
                                                        onChange={handleOnchange}
                                                    >
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </SelectBox>
                                                </InputContainer>

                                            </div>

                                            <div className="w-1/5 px-1">
                                                <InputContainer>
                                                    <SelectBox
                                                        label={`入力エリア${number}入力方法`}
                                                        name={`area${number}InputType`}
                                                        labelClassName="text-blue-100 text-[12px]"
                                                        inputClassName="bg-blue-25"
                                                        onChange={handleOnchange}
                                                    >
                                                        <option value="0">半角数字ドロップダウン</option>
                                                        <option value="1">半角数字キーボード入力</option>
                                                    </SelectBox>
                                                </InputContainer>

                                            </div>
                                            {areaInputTypeValueList[index] == 0 &&
                                                <>
                                                    <div className="w-1/5 px-1">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label={`ドロップダウン開始数（ゼロ埋め）`}
                                                                name={`area${number}DropdownStartNumber`}
                                                                labelClassName="text-blue-100 text-[12px]"
                                                                inputClassName="bg-blue-25"
                                                                onChange={handleOnchange}
                                                            >
                                                                <TokenLoginInputOptions numOfOptions={formData[`area${number}TextLength`]} />
                                                            </SelectBox>
                                                        </InputContainer>

                                                    </div>

                                                    <div className="w-1/5 px-1">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label={`ドロップダウン終了数（ゼロ埋め）`}
                                                                name={`area${number}DropdownEndNumber`}
                                                                labelClassName="text-blue-100 text-[12px]"
                                                                inputClassName="bg-blue-25"
                                                                onChange={handleOnchange}
                                                            >
                                                                <TokenLoginInputOptions numOfOptions={formData[`area${number}TextLength`]} />
                                                            </SelectBox>
                                                        </InputContainer>

                                                    </div>
                                                </>
                                            }
                                            <div className="w-1/5 px-1">
                                                <InputContainer>
                                                    <SelectBox
                                                        label={`ドロップダウン初期選択`}
                                                        name={`area${number}InitialNumber`}
                                                        labelClassName="text-blue-100 text-[12px]"
                                                        inputClassName="bg-blue-25"
                                                        onChange={handleOnchange}
                                                    >
                                                        <TokenLoginInputOptions numOfOptions={formData[`area${number}TextLength`]} />
                                                    </SelectBox>
                                                </InputContainer>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper >
    )
}