import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import BlockModalFooter from '../../../components/AppDesignComponent/blockModals/BlockModalFooter';
import SelectBox from '../../../components/Form/FormInputs/SelectBox';
import TextBox from '../../../components/Form/FormInputs/TextBox';
import DragAppCsv from '../../../components/ListElementDrag/DragAppCsv';
import TagBoxComponentV1 from '../../../components/ManagementItem/TagBoxComponentV1';
import ModalTitle from '../../../components/Modal/components/ModalTitle';
import WhiteModalWrapper from '../../../components/Modal/components/WhiteModalWrapper';
import InputContainer from '../../../components/Wrapper/InputContainer';
import { DISPLAY_CONTROL_OPTION, NUMERIC_FIELD_FORMAT_OPTION, TIME_FIELD_FORMAT_OPTION } from './dataService';
import _ from "lodash";
import './fieldModal.css';

export default function FieldModal({
    filterRecords,
    fieldRecords,
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    fieldKey = '',
    dragError={}
}) {
    const [formData, setFormData] = useState(blockData);

    const pathName = window.location.pathname;
    const routeName = pathName.split('/').pop();
    const [dragList, setDragList] = useState([]);

    const [tagBoxItems, setTagBoxItems] = useState([]);
    const [displayControlVal, setDisplayControlVal] = useState(0);
    // Tag box handle state
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });
    const [countTagBox1, setCoutTagBox1] = useState([]);

    const [searchItemNameValue, setSearchItemNameValue] = useState('');

    const [buttonType, setButtonType] = useState({
        buttonName: 'フィルターを追加する',
        type: 'F',
        buttonData: [],
        buttonItems: [],
        placeholder: 'フィルターを追加する',
    });
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
        checkbox1: { show: false, space: 'col-span-1', header: 'abc3' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-6', header: '停留所住所' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: {
            show: true,
            space: 'col-span-7',
            header: 'フィルター',
            editable: false,
        },
        inputBox2: { show: false, space: 'col-span-10', header: 'abc5' },
        inputBox3: { show: true, space: 'col-span-3', header: '値' },
        pen: { show: false, space: 'col-span-1', header: '編集' },
        trash: { show: true, space: 'col-span-1', header: '削除' },
    });
    const sessionStorageDragKey = `${routeName}_drag`;

    useEffect(() => {
        fieldRecords.map((item) => {
            if (item.disabled) item.disabled = false;
        });
        setTagBoxItems(fieldRecords);
    }, []);

    useEffect(() => {
        if (formData) {
            let displayControlVal = Number(formData.displayControl);
            setDisplayControlVal(displayControlVal);
        }
    }, [formData]);

    // DRAG-APP state handle whole things END
    useEffect(() => {
        try {
            setTimeout(() => {
                //setLoading && setLoading(false)
            }, 3000);

            const targetDragItem = JSON.parse(sessionStorage.getItem(sessionStorageDragKey)).find(
                (item) => item.fTypeId == formData.fTypeId
            );
            const selectedItemsIdArr = [];
            if (targetDragItem) {
                targetDragItem?.innerDrag &&
                    targetDragItem.innerDrag.forEach((item) => {
                        selectedItemsIdArr.push(item.fTypeId);
                    });
            }
            const newButtonType = {
                ...buttonType,
                buttonData: filterRecords?.map((filter) => {
                    return {
                        id: filter.filterId,
                        text: filter.filterManageName ? filter.filterName + '（' + filter.filterManageName + '）' : filter.filterName,
                        managementName: filter.filterManageName,
                        disabled: selectedItemsIdArr.includes(filter.filterId),
                    };
                }),
                buttonItems: typeof targetDragItem !== 'undefined' ? targetDragItem.innerDrag : '',
            };
            setButtonType(newButtonType);
            // setLoading && setLoading(false)
        } catch (error) {
            console.log('AddedCSVExportModal Error F Type Button Update', error);
        }
    }, [filterRecords, displayControlVal === 1]);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const typeWiseHtmlRender = (type) => {
        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
                return (
                    <>
                        <InputContainer>
                            <TextBox
                                label="フィールドフォーマット"
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 placeholder-blue-100"
                                placeholder="例）@@@@-@@@@-@@@@"
                                name="fieldFormat"
                            />
                        </InputContainer>

                        <p class="mt-8">フィールドの文字を先頭から@に置き換えフォーマットします。</p>
                        <p>フィールドの文字数がフォーマットに指定した文字数より少ないときは置き換えを終了します</p>
                    </>
                );
            case 4:
                return (
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
                );
            case 5:
                return (
                    <>
                        <InputContainer>
                            <TextBox
                                label="フィールドフォーマット"
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 placeholder-blue-100"
                                placeholder="例）yyyy年(GGGG年)M月d日"
                                name="fieldFormat"
                            />
                        </InputContainer>

                        <div className="lg:px-10">
                            <table className="min-w-full border-2 border-blue-100 mt-3 field-date-format-table">
                                <tr>
                                    <th className="border-b border-r border-blue-100 px-1 py-1">種類</th>
                                    <th className="border-b border-r border-blue-100 px-1 py-1">type</th>
                                    <th className="border-b border-r border-blue-100 px-1 py-1">例</th>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="3">
                                        元号
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">G..GGG</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">AD, BC</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">GGGG</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">Anno Domini, Before Christ</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">GGGGG</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">A, B</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="3">
                                        年
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">y</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">44, 1, 1900, 2017</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">yy</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">44, 01, 00, 17</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">yyyy</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        0044, 0001, 1900, 2017
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="4">
                                        月
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">M</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">1, 2, ..., 12</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">MM</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">01, 02, ..., 12</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">MMM</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">Jan, Feb, ..., Dec</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">MMMM</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">January, February, ..., December</span>
                                    </td>
                                </tr>
                                {/* DAY ROW START */}
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        日
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">d</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">1, 2, ..., 31</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">dd</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">01, 02, ..., 31</td>
                                </tr>
                                {/* DAY ROW END */}
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        週
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">E..EEE</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">Mon, Tue, Wed, ..., Su</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">EEEE</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">Monday, Tuesday, ..., Sunday</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        午前午後
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">a..aaa</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">AM, PM</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">aaaa</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">
                                        <span className="text-red-500">a.m., p.m.</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        時間 [1-12]
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">h</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">1, 2, ..., 11, 12</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">hh</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">01, 02, ..., 11, 12</td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        時間 [0-23]
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">H</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">0, 1, 2, ..., 23</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">HH</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">00, 01, 02, ..., 23</td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        時間 [0-11]
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">K</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">1, 2, ..., 11, 0</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">KK</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">1, 2, ..., 11, 0</td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        時間 [1-24]
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">k</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">24, 1, 2, ..., 23</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">kk</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">24, 01, 02, ..., 23</td>
                                </tr>

                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1" rowSpan="2">
                                        分
                                    </td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">m</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">0, 1, ..., 59</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">mm</td>
                                    <td className="border-b border-r border-blue-100 px-1 py-1">00, 01, ..., 59</td>
                                </tr>
                            </table>
                        </div>
                    </>
                );
            case 6:
                return (
                    <>
                        <InputContainer>
                            <SelectBox
                                label="フィールドフォーマット"
                                inputClassName="bg-transparent text-blue-100"
                                labelClassName="text-blue-100"
                                border="border-unset border-b-[1px]"
                                name="fieldFormat"
                            >
                                {TIME_FIELD_FORMAT_OPTION.length > 0 &&
                                    TIME_FIELD_FORMAT_OPTION.map((option, index) => (
                                        <option value={option.id} key={option.id}>
                                            {option.value}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                    </>
                );
            case 7:
                return (
                    <>
                        <InputContainer>
                            <SelectBox
                                label="フィールドフォーマット"
                                inputClassName="bg-transparent text-blue-100"
                                labelClassName="text-blue-100"
                                border="border-unset border-b-[1px]"
                                name="fieldFormat"
                            >
                                {NUMERIC_FIELD_FORMAT_OPTION.length > 0 &&
                                    NUMERIC_FIELD_FORMAT_OPTION.map((option, index) => (
                                        <option value={option.id} key={option.id}>
                                            {option.value}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                    </>
                );
            default:
                break;
        }
    };

    const displayControlOnChange = (e) => {
        setDisplayControlVal(Number(e.target.value));
    };

    const finteredTagboxItems = () => {
        if (searchItemNameValue) {
            const tagBox1Key = `${routeName}_timestamp_tag_box1_${formData.fTypeId}`;
            const tagBoxValueIds = JSON.parse(sessionStorage.getItem(tagBox1Key));

            let prevSelectedFields = [];
            if (Array.isArray(tagBoxValueIds) && tagBoxValueIds.length > 0) {
                prevSelectedFields = tagBoxItems.filter(x => tagBoxValueIds.includes(x.id));
            }

            console.log("searchItemNameValue", searchItemNameValue)

            const filteredFields = tagBoxItems.filter((item) => {
                return Object.values(_.pick(item, ["text", "fieldManageName"])).some((value) => String(value).toLowerCase().includes(searchItemNameValue.toLowerCase()));
            });

            return _.uniqBy([...prevSelectedFields, ...filteredFields], 'id');
        }

        return tagBoxItems;
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title={`${formData?.inputBox.value}フィールド設定`} className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <TextBox
                                        label="CSVカラム名"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 placeholder-blue-100"
                                        placeholder="例）〒"
                                        name="csvColumnName"
                                    />
                                </InputContainer>

                                {typeWiseHtmlRender(formData?.inputBox.type)}

                                <SelectBox
                                    label="表示制御（この機能を利用する場合、上部フォーマッターは機能しません）"
                                    inputClassName="bg-transparent text-blue-100 mb-4"
                                    labelClassName="text-blue-100 mt-5"
                                    border="border-unset border-b-[1px]"
                                    name="displayControl"
                                    onChange={displayControlOnChange}
                                >
                                    {DISPLAY_CONTROL_OPTION.length > 0 &&
                                        DISPLAY_CONTROL_OPTION.map((option, index) => (
                                            <option value={option.id} key={option.id}>
                                                {option.value}
                                            </option>
                                        ))}
                                </SelectBox>

                                {displayControlVal === 1 ? (
                                    <DragAppCsv
                                        title=""
                                        dragList={dragList}
                                        buttonType={{ ...buttonType }}
                                        controlDragDrop={controlDragDrop}
                                        fTypeId={formData.fTypeId}
                                        stateInfoCsvImport={{}}
                                        customSearchLabel='表示条件（フィルター名・管理名）'
                                    // setLoading={setLoading}
                                    />
                                ) : displayControlVal === 2 ? (
                                    <div className="w-full">
                                        <InputContainer className="mb-0">
                                            <TextBox
                                                label={'表示条件（フィールド名・管理名）'}
                                                labelClassName="text-blue-100 text-left"
                                                inputClassName="bg-blue-25 mb-4"
                                                type="text"
                                                name="customSearchName"
                                                placeholder={'表示条件（フィールド名・管理名）'}
                                                value={searchItemNameValue}
                                                onChange={(e) => setSearchItemNameValue(e.target.value)}
                                            />
                                        </InputContainer>

                                        <label htmlFor="tagBox" class="text-blue-100">対象フィールド</label>
                                        <InputContainer>
                                            <TagBoxComponentV1
                                                valueExpr="id"
                                                displayExpr="text"
                                                placeholder="選択してください"
                                                key={'tag_box1'}
                                                count={'tag_box1_' + formData.fTypeId}
                                                dragList={finteredTagboxItems()}
                                                preDefineTagBoxValue={formData.tagBoxValue}
                                                functionMode={functionMode}
                                                pathName={routeName}
                                                countTagBox1={countTagBox1}
                                                setCoutTagBox1={setCoutTagBox1}
                                                id="tagBox"
                                            />
                                        </InputContainer>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <BlockModalFooter
                            errors={dragError}
                            setModalOpen={(e) => setModalOpen(e, formData)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
