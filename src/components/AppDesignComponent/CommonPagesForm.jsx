import { Form, Formik } from "formik";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { appDesignerState, getSelectedPageData } from "../../store/recoil/appDesignerState";
import { valueFormatCheck } from "../../utilities/commonFunctions";
import TextBox from "../Form/FormInputs/TextBox";
import InputContainer from "../Wrapper/InputContainer";
import PageBlocks from "./PageBlocks";




export default function CommonPagesForm() {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    let {
        appCommonPageManagerName,
        appCommonPageURLName,
        appCommonPageTitle,
        appCommonPageDescription,
        appCommonPageCustomClass,
        blocks = []
    } = selectedPageDetail || '';

    const commonPageList = tabItems[activeTab];


    function handleOnChange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value)

        updateState(name, value);
    }

    function updateState(key, value) {
        const currentStateData = JSON.parse(JSON.stringify({ ...recoilStateValue }));

        let updatedData = { ...selectedPageDetail, ...{ [key]: value } };

        const index = commonPageList.findIndex(x => x.appCommonPageId == activePageId);
        currentStateData.tabItems[activeTab][index] = updatedData;

        setRecoilState(currentStateData);
    }


    return (
        <>
            {selectedPageDetail && (
                <Formik initialValues={selectedPageDetail}>
                    <div className='relative w-full'>
                        <Form>
                            <div>
                                <InputContainer>
                                    <TextBox label="ページ管理名（変更不可）"
                                        name="appCommonPageManagerName"
                                        placeholder="ページ管理名"
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-gray-300 cursor-default pointer-events-none'
                                        value={appCommonPageManagerName}
                                        onChange={handleOnChange}
                                        readOnly
                                        tabIndex="-1"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label="ページファイル名（変更不可）"
                                        name="appCommonPageURLName"
                                        placeholder="ページファイル名"
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-gray-300 cursor-default pointer-events-none'
                                        value={appCommonPageURLName}
                                        onChange={handleOnChange}
                                        readOnly
                                        tabIndex="-1"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <TextBox label="ページタイトル名（16文字まで　タイトルタグ・音声読み上げに使用されます）"
                                        name="appCommonPageTitle"
                                        placeholder="ページタイトル名"
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        value={appCommonPageTitle}
                                        onChange={handleOnChange}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label="ページ説明文（64文字まで　ディスクリプションタグ・音声読み上げに使用されます"
                                        name="appCommonPageDescription"
                                        placeholder="ページ説明文"
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        value={appCommonPageDescription}
                                        onChange={handleOnChange}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label="ページカスタムClass"
                                        name="appCommonPageCustomClass"
                                        placeholder="ページカスタムClass"
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        value={appCommonPageCustomClass}
                                        onChange={handleOnChange}
                                    />
                                </InputContainer>
                            </div>
                        </Form>
                        <InputContainer className="!mb-0">
                            <PageBlocks
                                label="ブロックの配置"
                                config={{ idKey: 'appPageBlockId', activeItem: 0, clickableCells: ['blockPageTitle'] }}
                                blocks={blocks}
                            // transitionRoutes={transitions}
                            />
                        </InputContainer>
                    </div>
                </Formik>
            )}
        </>
    );
}