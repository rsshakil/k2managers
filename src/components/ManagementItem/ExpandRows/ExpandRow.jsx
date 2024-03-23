import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import useGetListWithPID from '../../../hooks/useGetListWithPID';
import commonConstants from '../../../lib/commonConstants';
import { baseURL, listEvent, listInstitute, listMethod } from '../../../restapi/queries';
import SelectBox from '../../Form/FormInputs/SelectBox';
import Checkbox from '../../FormikFreeComponents/CheckBox';
import Loading from '../../Loading/Loader';
import AddButton from '../../Table/FooterSection/AddButton';
import InputContainer from '../../Wrapper/InputContainer';
import TagBoxComponent from '../TagBoxComponent';
import { selectOptions } from './data';
import ExpandRowInput from './ExpandRowInput';
import ExpandRowInputV2 from './ExpandRowInputV2';

export default function ExpandRow({
    initialValues = {},
    extendFormType,
    label,
    trashLabel,
    item, // each row
    deteleFromFType, // delete form type data
    rowsLabel, // label of rows
    pathName, // RouteName -- Ex: role_add
    selectedItemConditionsArr = [], // Selected item conditions array for event item modal
    itemOptions = [], // Checkbox item options array for event item modal
    selectedItemOptions = [], // Selected item options array for event item modal
    itemConditions = [], // Filter item conditions
    itemConditionChange, // When item added or modified passing event here
    itemConditionChangeAmount,
    resetStateValue,
    setSystemError, // Added for Role_edit showing system error
    projectEvent, // Added for Role_edit Accordion
    sessionStorageKey,
    restrictionsType,
    amountValue,
    formType,
    setFieldValue,
    handleSubmit, // handleSubmit from function passed
    searchItemNameValue, // Optional :: Required for Search
    ...props
}) {
    const [extendForm, setExtendForm] = useState(item.expanded || false);
    const rotate = extendForm ? 'rotate(135deg)' : 'rotate(0)';
    const [formCount, setFormCout] = useState([{ formId: 1 }]);
    const [filterItems, setFilterItems] = useState([])
    const [selectedItemCon, setSelectedItemCon] = useState([])
    const [tagShow, setTagShow] = useState(initialValues[`tagType_${item.id}`] === 1);

    const FormObserver = ({ setTagShow }) => {
        const { values } = useFormikContext();

        useEffect(() => {
            if (typeof values[`tagType_${item.id}`] !== 'undefined') {
                setTagShow && setTagShow(values[`tagType_${item.id}`] === '1' || values[`tagType_${item.id}`] === 1);
            } else {
                setTagShow && setTagShow(item.eventFacilityRestrictions);
            }
        }, [values]);

        return null;
    };

    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} }),
        [countTagBox, setCoutTagBox] = useState([{ name: 'TagBox1', ID: 1 }]);

    const {
        records: eventRecords,
        fetchLoading: loadingEvent,
        fetchError: errorEvent,
    } = useGetListWithPID({
        info: {
            projectId: item.currentProjectId,
            baseURL: baseURL,
            listURL: listEvent,
            listMethod: listMethod,
            shouldGetRecord: extendFormType === 'role' ? true : false,
        },
    });
    const {
        records: instituteRecords,
        fetchLoading: loadingInstitute,
        fetchError: errorInstitute,
    } = useGetListWithPID({
        info: {
            projectId: item.currentProjectId,
            baseURL: baseURL,
            listURL: listInstitute,
            listMethod: listMethod,
            shouldGetRecord: extendFormType === 'role' ? true : false,
        },
    });
    if (extendFormType === 'role') {
        //errorEvent && setSystemError(errorEvent);
        //errorInstitute && setSystemError(errorInstitute);
        //403 permission error has been avoid
    }
    // --END --
    // console.log("UDOY selectedItemConditionsArr", item);
    // SEARCH FILTER ON SELECT-BOX START
    useEffect(() => {
        try {
            const { ID } = item;
            const eventItemData = JSON.parse(
                sessionStorage.getItem(sessionStorageKey)
            );

            const eventItem =
                eventItemData &&
                eventItemData.filter((eventItem) => eventItem.ID === ID)[0];
            const eventSelected = eventItem.selectedItemConditions[0].id;

            // console.group("Touhid")
            // console.log("eventItem: ", eventItem);

            if (eventItem?.ID === ID) {
                // let results =
                //     itemConditions.filter((item) => {
                //         return Object.values(item).some((value) =>
                //             String(value)
                //                 .toLowerCase()
                //                 .includes(searchItemNameValue.toLowerCase())
                //         );
                //     });

                let results = itemConditions.filter((item) => {
                    return item?.name.toLowerCase().includes(searchItemNameValue.toLowerCase());
                });


                // const v1SelectedItem = eventItem.selectedItemConditions.map(item=> item.id);
                // const v2ItemConditions = itemConditions.map(item => item.id);
                // const matchId = v2ItemConditions.filter(itemId => item === v1SelectedItem)

                // const matchingNames = itemConditions
                //   .map((obj1) => obj1.id)
                //   .filter((itemId) =>
                //     eventItem.selectedItemConditions.some(
                //       (obj2) => obj2.id === itemId
                //     )
                //   );


                // console.log("matchingNames:: ",matchingNames);
                // console.log("\n\n eventItem.selectedItemConditions:: ",eventItem.selectedItemConditions);
                // console.log("v1SelectedItem:: ",v1SelectedItem);
                // console.log("v2ItemConditions:: ",v2ItemConditions);


                let prevSelected =
                    eventSelected &&
                    itemConditions.filter((item) => item?.id === eventSelected)[0];
                // console.log("Avatar prevSelected:: ",prevSelected);
                // console.log("Avatar selectedItemConditionsArr:: ",selectedItemConditionsArr);


                setSelectedItemCon([prevSelected]) // TODO: set for multiple selectBox same Row


                // console.groupEnd()

                if (results) {
                    setFilterItems(
                        typeof prevSelected === "string"
                            ? results
                            : removeDuplicateOption(results, prevSelected)
                    );
                }
            }
        } catch (error) {
            console.warn("Search Error:: ", error);
        }
    }, [searchItemNameValue]);
    // SEARCH FILTER ON SELECT-BOX START

    useEffect(() => {
        let formArr = [];
        if (selectedItemConditionsArr.length > 0) {
            selectedItemConditionsArr.forEach((item) => {
                formArr.push({ formId: Math.floor(Math.random() * (10000 - 100 + 1) + 100) });
            });
            setFormCout(formArr);
        }
        if (extendFormType === 'eventItem') {
            setExtendForm(false);
        }

        if (item) {
            const selectedItemConditions = item.selectedItemConditions;
        }
        // setAmountValue
    }, []);

    // remove duplicated option from search result 
    const removeDuplicateOption = (results, prevSelected) => {
        // same id should remove from the option list other wise show error (corner case)
        let removeDuplicateItem
        let updatedOptionArray;
        if (results && prevSelected?.id) {
            removeDuplicateItem = results.filter(rs => rs.id !== prevSelected.id)
            if (removeDuplicateItem) {
                updatedOptionArray = [prevSelected, ...removeDuplicateItem]
                //  console.log("updatedOptionArray", updatedOptionArray)
            }
        }
        return updatedOptionArray;
    }

    // delete tagBox Handle
    const deleteTagBox = (e) => {
        if (countTagBox.length > 0) {
            const filterCountTagBox = countTagBox.filter((ctb) => ctb.ID !== e);
            setCoutTagBox([...filterCountTagBox]);
            localStorage.removeItem(`TagBox${e}`);
        }
    };
    // add form count
    const addInputFeildRows = () => {
        let formData = [...formCount];
        const formobject = { formId: Math.floor(Math.random() * (10000 - 100 + 1) + 100) };
        setFormCout([...formData, formobject]);

        // add selected item conditions sessionStorage event item dragList
        const eventItemData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
        const filteredItemData = eventItemData.map((item) => {
            let newSelectedItemCondition = { id: '', amount: '' };
            if (item.Name === rowsLabel) {
                item.selectedItemConditions.push(newSelectedItemCondition);
            }
            return item;
        });
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(filteredItemData));
    };
    // delete form count
    const deleteInputFiledRows = (data, rowsLabel, index) => {
        if (formCount.length > 1) {
            const filtered = formCount.filter((fc) => fc.formId !== data.formId);
            setFormCout([...filtered]);

            const eventItemData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
            if (eventItemData.length > 0) {
                const filteredItemData = eventItemData.map((item) => {
                    if (item.selectedItemConditions.length > 0) {
                        if (item.Name === rowsLabel) {
                            item.selectedItemConditions.splice(index, 1);
                        }
                        return item;
                    }
                    return item;
                });
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(filteredItemData));
            }
        }
    };

    const handleAccordion = () => {
        setExtendForm(!extendForm);
    };

    return (
        <>
            {extendFormType === 'role' && loadingEvent && loadingInstitute && <Loading />}
            <label className={`text-blue-100 ${!label ? 'hidden' : ''}`}>{label}</label>
            <div className="flex justify-between mb-4  mt-1">
                <div className="flex w-[96%] items-center">
                    <div
                        className="flex relative h-8 justify-between items-center w-full text-left"
                        onClick={handleAccordion}
                    >
                        <h1 className="text-blue-100">{rowsLabel ? rowsLabel : ''} </h1>
                        <div className="flex-grow border-t mx-2 border-blue-100"></div>
                    </div>
                    <div
                        className=" flex hover:text-blue-50 cursor-pointer items-center text-center text-blue-100"
                        onClick={handleAccordion}
                    >
                        <AiFillPlusCircle
                            className="h-[22px] w-[22px]"
                            style={{ transform: rotate, transition: 'all 0.4s linear' }}
                        />
                    </div>
                </div>
                <div className="flex-col flex w-[2%]">
                    <label className="text-blue-100">{trashLabel}</label>
                    <div className="hover:text-blue-50 flex justify-end mt-2 mr-2 cursor-pointer text-blue-100">
                        <FaTrash
                            className=""
                            onClick={() => {
                                if (extendFormType === 'role') {
                                    setFieldValue(`tagType_${item.id}`, '');
                                }
                                deteleFromFType(item);
                            }}
                        />
                    </div>
                </div>
            </div>
            <>
                {(extendFormType === 'eventItem' || extendFormType === 'eventCounsellor') && (
                    <div className={`px-10 ${extendForm ? 'block' : 'hidden'}`}>
                        <div className="flex flex-col justify-between">
                            <div className="flex space-x-10">
                                <label className="text-blue-100">
                                    アイテム条件（上から順に条件照合されます。条件に該当した場合だけ表示されます）
                                </label>
                                <label className="text-blue-100">販売価格</label>
                            </div>

                            {formCount.map((fc, i) => (
                                <ExpandRowInputV2
                                    key={`${item.id}_${i}`}
                                    fc={fc}
                                    i={i}
                                    handleSubmit={handleSubmit}
                                    // selectedItemConditionsArr={selectedItemConditionsArr}
                                    // selectedItemConditionsArr={ selectedItemCon.length === 0 || selectedItemCon === undefined ? selectedItemConditionsArr : selectedItemCon}
                                    rowsLabel={rowsLabel}
                                    itemConditionChange={itemConditionChange}

                                    // itemConditions={ filterItems?.length === 0 || typeof filterItems === 'undefined' ? itemConditions : filterItems}
                                    // itemConditions={itemConditions}

                                    selectedItemConditionsArr={selectedItemConditionsArr}

                                    itemConditions={searchItemNameValue === "" ? itemConditions : filterItems}
                                    allOptions={itemConditions}

                                    deleteInputFiledRows={deleteInputFiledRows}
                                    itemConditionChangeAmount={itemConditionChangeAmount}
                                    amountValue={amountValue}
                                />
                            ))}
                        </div>
                        <div className="pr-[46px]">
                            <AddButton
                                text="条件追加"
                                type="button"
                                onClick={() => {
                                    addInputFeildRows();
                                }}
                            />
                        </div>
                        <InputContainer>
                            <label className="text-blue-100">アイテム追加に変更</label>
                            {/* <label className="text-blue-100">オプション</label> */}
                            {itemOptions.map((option, i) => (
                                <div className="h-8 text-blue-100" key={i}>
                                    <Checkbox
                                        name={option.name}
                                        children={option.name}
                                        defaultChecked={selectedItemOptions.includes(option.id)}
                                        borderColor="border border-black"
                                        target_name={rowsLabel}
                                        target_index={i}
                                        target_value={option.id}
                                        onChange={itemConditionChange}
                                    />
                                </div>
                            ))}
                        </InputContainer>
                    </div>
                )}
                {extendFormType === 'role' && (
                    <>
                        <FormObserver setTagShow={setTagShow} />
                        <InputContainer className={`px-20 ${extendForm ? 'flex' : 'hidden'}`}>
                            <InputContainer>
                                <SelectBox
                                    label={'イベント・施設制限'}
                                    inputClassName="bg-blue-25 text-blue-100"
                                    labelClassName="text-blue-100"
                                    name={`tagType_${item.id}`}
                                    defaultValue={item.eventFacilityRestrictions}
                                >
                                    {selectOptions.length > 0 &&
                                        selectOptions.map((role) => (
                                            <option value={role.id} key={role.id}>
                                                {role.value}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>

                            <>
                                <InputContainer className={`mt-4 ${tagShow ? 'flex' : 'hidden'}`}>
                                    {/* SELECT EVENTS TO ALLOW */}
                                    <label className="text-blue-100">許可するイベント</label>
                                    <div>
                                        <div className="w-full flex">
                                            <div className="w-full">
                                                <InputContainer>
                                                    <TagBoxComponent
                                                        dragList={eventRecords}
                                                        functionMode={functionMode}
                                                        displayExpr="eventName"
                                                        valueExpr="eventId"
                                                        count="roleRelationStyle"
                                                        placeholder={commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                            '許可するイベント'
                                                        )}
                                                        pathName={pathName}
                                                        projectId={item.currentProjectId}
                                                        uniqueIdentifier="eventTag"
                                                        preDefineTagBoxValue={item.eventTag}
                                                    />
                                                </InputContainer>
                                            </div>
                                        </div>
                                    </div>
                                </InputContainer>
                                <InputContainer className={`${tagShow ? 'flex' : 'hidden'}`}>
                                    {/* SELECT FACILITY TO ALLOW */}
                                    <label className="text-blue-100">
                                        許可する施設（該当イベントの許可が必要です）
                                    </label>
                                    <div>
                                        <div className="w-full flex">
                                            <div className="w-full">
                                                <InputContainer>
                                                    <TagBoxComponent
                                                        dragList={instituteRecords}
                                                        functionMode={functionMode}
                                                        displayExpr="instituteSpecialName"
                                                        valueExpr="instituteId"
                                                        count="roleRelationStyle"
                                                        placeholder={commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                            '許可する施設'
                                                        )}
                                                        pathName={pathName}
                                                        projectId={item.currentProjectId}
                                                        uniqueIdentifier="instituteTag"
                                                        preDefineTagBoxValue={item.instituteTag}
                                                    />
                                                </InputContainer>
                                            </div>
                                        </div>
                                    </div>
                                </InputContainer>
                            </>
                            {/* dxTAG-BOX SHOW HIDE ------ END ------ */}
                        </InputContainer>
                    </>
                )}
            </>
        </>
    );
}
