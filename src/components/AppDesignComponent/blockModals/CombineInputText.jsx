//--------added 6th feb,23, no need anymore-------

import { Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";

import { inputModes, inputTypes } from "../../../lib/commonConstants";
import { autoComplete } from "../../../lib/tailwindClassAttributes";
import { getFieldList } from "../../../services/appDesignerService";
import {
    valueFormatCheck
} from "../../../utilities/commonFunctions";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import Loader from "../../Loading/Loader";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from "../../Modal/components/WhiteModalWrapper";
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";

function rangeItems(start, end) {
    return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
}
const fieldDivisionRange = rangeItems(1, 99);

const placeholderItem = {
    fieldId: "",
    fieldName:"フィールドを選択してください",
    fieldStyle: {
        caption: "フィールドを選択してください",
    },
};

export default function CombineInputText({
    blockData,
    uniqueError = {},
    handleBlur = () => {},
    setModalOpen = () => {},
    handleOnPressSave = () => {},
}) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId =
                    window.sessionStorage.getItem("currentProjectId");

                const { data, status } = await getFieldList(2, projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFieldList([placeholderItem, ...records]);
                }
                setLoading(false);
            } catch (err) { 
                setLoading(false);
            }
        }

        getFieldListInit();
    }, []);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        if (e.target.name === "fieldId") {
            const findField = fieldList.find((x) => x.fieldId === +value);
            setFormDataValue("fieldCode", findField.fieldCode);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        })); 
    }

    function setFormDataValue(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const fieldDivisionNumber = (number = 1) => {
        return (
            <React.Fragment key={number}>
                <div className="pr-8">
                    <InputContainer>
                        <SelectBox
                            label={`必須フィールド分割${number}(先頭詰め)`}
                            name={`numberOfSplitCharacters${number}`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            value={formData[`numberOfSplitCharacters${number}`]}
                            onChange={handleOnchange}
                        >
                            {fieldDivisionRange.map((n, i) => (
                                <option key={n} value={n}>
                                    {n}文字
                                </option>
                            ))}
                        </SelectBox>
                    </InputContainer>
                </div>
            </React.Fragment>
        );
    };

    const inputNumberElement = (number = 1) => {
        return (
            <React.Fragment key={number}>
                <label
                    htmlFor="headerAreaShadow"
                    className="text-blue-100 !mb-8 !mt-8"
                >
                    入力エリア{number}
                </label>
                <div className="px-8 pb-4 mt-2">
                    <InputContainer>
                        <TextBox
                            label="許可パターン正規表現"
                            name={`area${number}RegularExpressions`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}RegularExpressions`]}
                            onChange={handleOnchange}
                            placeholder="許可パターン正規表現"
                        />
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label={
                                <div>
                                    ラベル
                                    <span
                                        className="text-sm"
                                        style={{ float: "right", color: "red" }}
                                    >
                                        ※バリデーション動作はフォームブロック内で使用した時のみ動作します
                                    </span>
                                </div>
                            }
                            name={`area${number}Label`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}Label`]}
                            onChange={handleOnchange}
                            placeholder="ラベル"
                        />
                    </InputContainer>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="必須"
                                    name={`area${number}Required`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Required`]}
                                    onChange={handleOnchange}
                                >
                                    <option value={false}>任意</option>
                                    <option value={true}>必須</option>
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="value（初期値）"
                                    name={`area${number}Value`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Value`]}
                                    onChange={handleOnchange}
                                    placeholder="value"
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="placeholder"
                                    name={`area${number}Placeholder`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Placeholder`]}
                                    onChange={handleOnchange}
                                    placeholder="placeholder"
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <SelectBox
                                    label="maxlength(最大文字数)"
                                    name={`area${number}Maxlength`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Maxlength`]}
                                    onChange={handleOnchange}
                                >
                                    <option value="256" selected>256</option>
                                    <option value="">指定しない</option>
                                    {_.range(1, 257).map((x) => (
                                        <option key={x} value={x}>{x}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="w-1/5 pl-2">
                            <InputContainer>
                                <SelectBox
                                    label="入力モード"
                                    name={`area${number}InputMode`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}InputMode`]}
                                    onChange={handleOnchange}
                                >
                                    {inputModes.map((x) => (
                                        <option key={x.value} value={x.value}>
                                            {x.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="readonly"
                                    name={`area${number}ReadOnly`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}ReadOnly`]}
                                    onChange={handleOnchange}
                                >
                                    <option value={false}>書き込み可</option>
                                    <option value={true}>書き込み不可</option>
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <SelectBox
                                    label="必須表示"
                                    name={`area${number}RequiredDisplay`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={
                                        formData[`area${number}RequiredDisplay`]
                                    }
                                    onChange={handleOnchange}
                                >
                                    <option value={false}>非表示</option>
                                    <option value={true}>表示</option>
                                    {/* {inputTypes.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)} */}
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <SelectBox
                                    label="type属性"
                                    name={`area${number}InputType`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}InputType`]}
                                    onChange={handleOnchange}
                                >
                                    {inputTypes.map((x) => (
                                        <option key={x.value} value={x.value}>
                                            {x.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="name属性"
                                    name={`area${number}Name`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Name`]}
                                    onChange={handleOnchange}
                                    placeholder="name属性"
                                    onBlur={(e) =>
                                        handleBlur(e, blockData.appPageBlockId)
                                    }
                                    isRequired
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 pl-2">
                            <InputContainer>
                                <SelectBox
                                    label="autocomplete属性"
                                    name={`area${number}AutoComplete`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={
                                        formData[`area${number}AutoComplete`]
                                    }
                                    onChange={handleOnchange}
                                >
                                    {autoComplete.map((field, index) => (
                                        <option
                                            key={field.value + "_" + index}
                                            value={field.value}
                                        >
                                            {" "}
                                            {field.caption}{" "}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex">
                        
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <TextBox
                                    label="正規表現エラー時テキスト"
                                    name={`area${number}RegExErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={
                                        formData[`area${number}RegExErrorText`]
                                    }
                                    onChange={handleOnchange}
                                    placeholder="正規表現エラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="必須エラー時テキスト"
                                    name={`area${number}RequiredErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={
                                        formData[
                                            `area${number}RequiredErrorText`
                                        ]
                                    }
                                    onChange={handleOnchange}
                                    placeholder="必須エラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <InputContainer>
                        <TextBox
                            label={`ラベルカスタムクラス`}
                            name={`area${number}LabelCustomClass`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}LabelCustomClass`]}
                            onChange={handleOnchange}
                            placeholder={`カスタムClass`}
                        />
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label={`inputカスタムクラス`}
                            name={`area${number}InputCustomClass`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}InputCustomClass`]}
                            onChange={handleOnchange}
                            placeholder={`カスタムClass`}
                        />
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label={`placeholderカスタムクラス`}
                            name={`area${number}PlaceholderCustomClass`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={
                                formData[`area${number}PlaceholderCustomClass`]
                            }
                            onChange={handleOnchange}
                            placeholder={`カスタムClass`}
                        />
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label={`エラーテキストカスタムクラス`}
                            name={`area${number}ErrorTextCustomClass`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={
                                formData[`area${number}ErrorTextCustomClass`]
                            }
                            onChange={handleOnchange}
                            placeholder={`カスタムClass`}
                        />
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label={`areaWrapカスタムクラス`}
                            name={`area${number}WrapCustomClass`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}WrapCustomClass`]}
                            onChange={handleOnchange}
                            placeholder={`カスタムClass`}
                        />
                    </InputContainer>
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper
                width="border-none text-black"
                className="items-start"
            >
                <ModalTitle
                    title="結合入力フォーム設定"
                    className="text-blue-100 text-xl"
                />

                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                >
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            
                                <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                    <div className="flex flex-col py-10">
                                        <InputContainer>
                                            <SelectBox
                                                label="結合個数"
                                                name="numberOfCombine"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                value={formData.numberOfCombine}
                                                onChange={handleOnchange}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </SelectBox>
                                        </InputContainer>

                                        <div className="flex">
                                            {_.range(
                                                formData.numberOfCombine
                                            ).map((x) =>
                                                fieldDivisionNumber(x + 1)
                                            )}
                                        </div>

                                        <InputContainer>
                                            <SelectBox
                                                label="対象フィールド"
                                                name="fieldId"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                value={formData.fieldId}
                                                onChange={handleOnchange}
                                            >
                                                {fieldList.map((x) => (
                                                    <option
                                                        key={x.fieldId}
                                                        value={x.fieldId}
                                                    >
                                                        {x.fieldName}
                                                    </option>
                                                ))}
                                            </SelectBox>
                                        </InputContainer>

                                        

                                        {_.range(formData.numberOfCombine).map(
                                            (x) => inputNumberElement(x + 1)
                                        )}

                                        <InputContainer className="mt-10">
                                            <TextBox
                                                label="blockWrapカスタムクラス"
                                                name="blockWrapCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                </div>

                                <BlockModalFooter
                                    errors={uniqueError}
                                    setModalOpen={() => setModalOpen(false)}
                                    handleOnPressSave={(e) => handleOnPressSave(e, formData)}

                                />
                            
                        </Form>
                        </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
