import { TagBox } from 'devextreme-react/tag-box';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import ArrayStore from 'devextreme/data/array_store';
import {
    appDesignerState,
    getSelectedPageData,
    getTransitionDestinationRouteList,
} from '../../store/recoil/appDesignerState';
import { valueFormatCheck } from '../../utilities/commonFunctions';
import SelectBox from '../Form/FormInputs/SelectBox';
import TextBox from '../Form/FormInputs/TextBox';
import InputContainer from '../Wrapper/InputContainer';
import PageBlocks from './PageBlocks';

const stepRanges = _.range(9);

const FreePagesForm = ({ errors = [] }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    let {
        appPageId,
        appPageManagerName,
        appPageURLName,
        appPageTitle,
        appPageDescription,
        appPageStepValue,
        appPageStepType,
        appPageAuthFlag,
        appPageTransitionSource,
        appPageCustomClass,
        blocks = [],
    } = selectedPageDetail || '';

    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);

    // const pageTransitions = new DataSource({
    //     store: transitionRoutes,
    //     key: "id",
    //     group: "Category"
    // });

    const pageTransitions = new ArrayStore({
        data: transitionRoutes,
        key: 'id',
    });

    //const selectedPageTransitions = [];
    const selectedPageTransitions = appPageTransitionSource?.url || [];

    let error = {};
    if (errors && errors.length > 0) {
        error = errors.find((x) => x.appPageId === appPageId)?.error;
    }

    function handleOnChange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);
        updateState(name, value);
    }

    function handleOnChangeTags(e) {
        const { addedItems = [], removedItems = [] } = e;
        let { url: updatedTransitionsSources = [] } = appPageTransitionSource;

        if (addedItems.length > 0) {
            const addUrls = _.map(addedItems, 'url');
            updatedTransitionsSources = [...updatedTransitionsSources, ...addUrls];
        }

        if (removedItems.length > 0) {
            const removeUrls = new Set(_.map(removedItems, 'url'));

            updatedTransitionsSources = updatedTransitionsSources.filter((x) => !removeUrls.has(x));
        }

        updatedTransitionsSources = _.uniq(updatedTransitionsSources);

        updateState('appPageTransitionSource', { url: updatedTransitionsSources });
    }

    function updateState(key, value) {
        const updatedPage = { ...selectedPageDetail, ...{ [key]: value } };

        let updatedTabItems = [...tabItems[activeTab]];
        updatedTabItems.splice(_.findIndex(updatedTabItems, { appPageId: activePageId }), 1, updatedPage);

        setRecoilState({
            ...recoilStateValue,
            tabItems: {
                ...recoilStateValue.tabItems,
                [activeTab]: updatedTabItems,
            },
        });
    }

    return (
        <>
            {selectedPageDetail && (
                <Formik initialValues={selectedPageDetail}>
                    <div className={`relative w-full`}>
                        <div>
                            <Form>
                                <InputContainer>
                                    <TextBox
                                        label="ページ管理名（16文字まで）"
                                        name="appPageManagerName"
                                        placeholder="ページ管理名"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName={`bg-blue-25 ${
                                            error && error.hasOwnProperty('appPageManagerName') ? 'error' : ''
                                        }`}
                                        value={appPageManagerName}
                                        onChange={handleOnChange}
                                        isRequired
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="ページファイル名（同一名使用不可・半角英字小文字のみ・保存後にページファイル名の変更はできません）"
                                        name="appPageURLName"
                                        placeholder="ページファイル名"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName={`${
                                            !selectedPageDetail.hasOwnProperty('isNewPage')
                                                ? 'bg-gray-300 cursor-default pointer-events-none'
                                                : 'bg-blue-25'
                                        } ${error && error.hasOwnProperty('appPageURLName') ? 'error' : ''}`}
                                        value={appPageURLName}
                                        readOnly={!selectedPageDetail.hasOwnProperty('isNewPage')}
                                        isRequired
                                        onChange={(e) => {
                                            const { value } = e.target;
                                            if (!value || (value && value.match(/^[a-z]+$/))) {
                                                handleOnChange(e);
                                            }
                                        }}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="ページタイトル名（16文字まで　タイトルタグ・音声読上に使用されます）"
                                        name="appPageTitle"
                                        placeholder="ページタイトル名"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        value={appPageTitle}
                                        onChange={handleOnChange}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="ページ説明文（64文字まで　ディスクリプションタグ・音声読上に使用されます）"
                                        name="appPageDescription"
                                        placeholder="ページ説明文"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        value={appPageDescription}
                                        onChange={handleOnChange}
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <SelectBox
                                        label="ステップ"
                                        name="appPageStepValue"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        value={appPageStepValue}
                                        onChange={handleOnChange}
                                    >
                                        <option value="none">非表示</option>
                                        {stepRanges.map((x) => (
                                            <option key={x} value={x}>
                                                {x}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <SelectBox
                                        label="ステップタイプ"
                                        name="appPageStepType"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        value={appPageStepType}
                                        onChange={handleOnChange}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <SelectBox
                                        label="ログインチェック"
                                        name="appPageAuthFlag"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        value={appPageAuthFlag}
                                        onChange={handleOnChange}
                                    >
                                        <option value={0}>あり</option>
                                        <option value={1}>なし</option>
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <label className="text-blue-100 text-xs">
                                        遷移元チェック（指定された遷移元以外からのアクセスは不正遷移エラーになります）
                                    </label>
                                    <TagBox
                                        name="appPageTransitionSource"
                                        dataSource={pageTransitions}
                                        value={selectedPageTransitions}
                                        // defaultValue={selectedPageTransitions}
                                        //grouped={true}
                                        displayExpr="name"
                                        valueExpr="url"
                                        //onValueChanged={handleOnChangeTags}
                                        onSelectionChanged={handleOnChangeTags}
                                        noDataText="データがありません"
                                        selectAllText="すべて選択する"
                                        placeholder="遷移元チェックを選択してください"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <TextBox
                                        label="ページカスタムClass"
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        name="appPageCustomClass"
                                        placeholder="カスタムClass"
                                        value={appPageCustomClass}
                                        onChange={handleOnChange}
                                    />
                                </InputContainer>
                            </Form>

                            <InputContainer className="!mb-0">
                                <PageBlocks
                                    label="ブロックの配置"
                                    config={{
                                        idKey: 'appPageBlockId',
                                        activeItem: 0,
                                        clickableCells: ['blockPageTitle'],
                                    }}
                                    blocks={blocks}
                                    // transitionRoutes={transitionRoutes}
                                />
                            </InputContainer>
                        </div>
                    </div>
                </Formik>
            )}
        </>
    );
};
export default FreePagesForm;
