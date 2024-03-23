import { DateBox } from 'devextreme-react';
import { locale } from 'devextreme/localization';
import React, { useEffect, useState } from 'react';
import TableControls from '../../components/Table/TableControls';

import { listBusRoute, listCategory, listCounselor, listInstitute, listItem } from '../../restapi/queries';

export default function TemplateFilterViewDynamic({ handleChange, handleChange2, handleOnChangeText, customerValuesProps, filterRender,filterRefresh }) {
    locale('ja-JP');
console.log('customerValuesProps',customerValuesProps);
    const [values, setFormData] = useState(customerValuesProps);
    const [headerSearchFieldLists, setSearchFieldLists] = useState([]);
    const [categoryLists, setCategoryLists] = useState([]);
    const [itemLists, setItemLists] = useState([]);
    const [instituteLists, setInstituteLists] = useState([]);
    const [counselorLists, setCounselorLists] = useState([]);
    const [busRouteLists, setBusRouteLists] = useState([]);

    const [dateBoxConfig, setDateBoxConfig] = useState({
        acceptCustomValue: false,
        interval: 1,
        now: new Date(),
        min: new Date(1800, 0, 1),
        max: new Date(2050, 0, 1),
    });
    let colNo = 1;
    useEffect(()=>{
        setFormData(customerValuesProps);
    },[customerValuesProps])
    // console.log("✋✋✋---------0");
    console.log("appId_appId0 === ", values);
    const [templateIdValue, setTemplateIdValue] = useState();
    const [appIdValue, setAppIdValue] = useState();
    // let templateIdValue = values.templateId;
    const getCustomerViewTemplateSearchFieldList = async () => {
        // console.log('✋✋✋ getCustomerViewTemplateSearchFieldList Started')
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            let sessionTemplateListInfo = JSON.parse(sessionStorage.getItem('customer_view_template_' + projectId));
            console.log('sessionTemplateListInfo', sessionTemplateListInfo);
            if (sessionTemplateListInfo?.length > 0) {
                let selectedTemplateField = sessionTemplateListInfo.find(
                    (item) => item.customerViewTemplateId == templateIdValue
                );
                let customerViewTemplateSearch = selectedTemplateField?.customerViewTemplateSearch;
                console.log('customerViewTemplateSearch', customerViewTemplateSearch);
                if (customerViewTemplateSearch?.length > 0) {
                    customerViewTemplateSearch = customerViewTemplateSearch.sort((a, b) =>
                        a.currentPos > b.currentPos ? 1 : -1
                    );
                    let fieldInfoArray = customerViewTemplateSearch && customerViewTemplateSearch.map((item) => item.fieldData);
                    // console.log('setSearch',filterRender)
                    setSearchFieldLists(fieldInfoArray);
                } else {
                    // console.log('NotsetSearch',filterRender)
                    setSearchFieldLists([]);
                }
            }
        } catch (err) {
            console.log('Field err', err);
        }
    };

    useEffect(() => {
        // console.log("xxxxx---------1");
        const value = values.templateId
        setTemplateIdValue(value);
        const projectId = sessionStorage.getItem('currentProjectId');
        if (sessionStorage.getItem('customer_view_template_' + projectId) != null) {
            const appIdRow = JSON.parse(sessionStorage.getItem('customer_view_template_' + projectId)).find((row) => {
                if (row.customerViewTemplateId === Number(values.templateId)) {
                    return row;
                }
            });
            if (appIdRow?.appId) {
                setAppIdValue(appIdRow.appId);
            }
        }
    }, [values.templateId]);

    useEffect(() => {
        getCustomerViewTemplateSearchFieldList();
        listQueryForDropdown();
    }, [appIdValue, templateIdValue]);

    
        useEffect(() => {
            console.log('fire@default')
            listQueryForDropdown();
            console.log('fire@defaultsssss',filterRefresh)
        }, [filterRefresh]);
  

    async function listQueryForDropdown() {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                // let appId = JSON.parse(sessionStorage.getItem(`customer_view_selected_template_${projectId}`))?.appId;
                let recordListsDataCategory = sessionStorage.getItem(`customer_view_category_filter_` + projectId);
                let recordCategoryLists = JSON.parse(recordListsDataCategory);
                let recordListsDataInstitute = sessionStorage.getItem(`customer_view_institute_filter_` + projectId);
                let recordInstituteLists = JSON.parse(recordListsDataInstitute);
                let recordListsDataItem = sessionStorage.getItem(`customer_view_item_filter_` + projectId);
                let recordItemLists = JSON.parse(recordListsDataItem);
                let recordListsDataCounselor = sessionStorage.getItem(`customer_view_counselor_filter_` + projectId);
                let recordCounselorLists = JSON.parse(recordListsDataCounselor);
                let recordListsDataBusRoute = sessionStorage.getItem(`customer_view_busRoute_filter_` + projectId);
                let recordBusRouteLists = JSON.parse(recordListsDataBusRoute);
                recordCategoryLists = recordCategoryLists ?? [];
                recordInstituteLists = recordInstituteLists ?? [];
                recordItemLists = recordItemLists ?? [];
                recordCounselorLists = recordCounselorLists ?? [];
                recordBusRouteLists = recordBusRouteLists ?? [];
                setCategoryLists(recordCategoryLists[`appId_` + appIdValue]);
                setInstituteLists(recordInstituteLists[`appId_` + appIdValue]);
                setItemLists(recordItemLists[`appId_` + appIdValue]);
                setCounselorLists(recordCounselorLists[`appId_` + appIdValue]);
                setBusRouteLists(recordBusRouteLists[`appId_` + appIdValue]);
            }
        } catch (err) {
            console.log('Field err', err);
        }
    }

    function fieldType4DropdownList(fieldInfo) {
        let fieldType4OptionList = [
            { id: 1, value: fieldInfo?.fieldStyle.trueText },
            { id: 0, value: fieldInfo?.fieldStyle.falseText },
        ];
        return fieldType4OptionList;
    }
    function fieldType3DropdownList(fieldInfo) {
        let fieldType3OptionList = fieldInfo?.fieldStyle?.lookup?.map((dropDownItem) => {
            return { id: dropDownItem?.fieldListCode, value: dropDownItem?.inputBox2?.value };
        });
        return fieldType3OptionList;
    }

    function fieldType8DropdownList(fieldInfo) {
        let fieldCode = fieldInfo?.fieldCode;
        switch (fieldCode) {
            case '00000a21':
                return categoryLists;
            case '00000a22':
                return instituteLists;
            case '00000a23':
                return itemLists;
            case '00000a24':
                return counselorLists;
            case '00000a25':
                return busRouteLists;
        }
    }

    // option change
    const onOptionChanged = (e) => {
        if (e.name === 'text' && e.value !== '') {
        }
    },
    onChangeHandle = (e) => {
    },
    onValueChangedHandleSD = (e) => {
        if (typeof e.event !== 'undefined') {
            let selectedValue = e.value ?? '1800/01/01';
            let dateValues = prepareDateValue(selectedValue);
            handleChange({
                target: {
                    name: e.element.id,
                    value: dateValues == '1800/01/01' ? undefined : dateValues,
                },
            });
        }
        },
        onValueChangedHandleSDTime = (e) => {
        if (typeof e.event !== 'undefined') {
            let selectedValue = e.value ?? '1800/01/01';
            console.log('timeVVVVV',e.value);
            let dateValues = prepareTimeValue(selectedValue);
            console.log('dateValuesdateValues', dateValues);
            let dateFormat = new Date(dateValues);
            console.log('dateValuesdateValues', `${dateFormat.getHours()}:${dateFormat.getMinutes()}`);

            handleChange({
                target: {
                    name: e.element.id,
                    value: dateValues == '1800/01/01' ? undefined : dateValues,
                },
            });
        }
    };
    const prepareDateValue = (value) => {
        let dateFormat = new Date(value);
        let day = `${dateFormat.getDate()}`;
        let month = `${dateFormat.getMonth() + 1}`;
        day = day.length == 1 ? `0${day}` : day;
        month = month.length == 1 ? `0${month}` : month;

        return `${dateFormat.getFullYear()}/${month}/${day}`;
    };
    const prepareTimeValue = (value) => {
        console.log('vvvv',value);
        if (value && value!='1800/01/01') {
            if (typeof value == 'string' && value.includes(':')) {
                let time = '2023/01/01 ' + value + ':01';
                return Math.floor(new Date(time).getTime());
            } else {
                let valueLenth = value.toString();
                if (valueLenth.length > 4) {
                    return Math.floor(new Date(value).getTime());
                } else {
                    let result = valueLenth.padStart(4, '0');
                    result = result.slice(0, 2) + ':' + result.slice(2);
                    let timesValue = '2023/01/01 ' + result + ':01';

                    return Math.floor(new Date(timesValue).getTime());
                }
            }
        } else {
            return undefined;
        }
    };

    const handleOnChangeTextInner = (e) =>{
        const { name, value } = e.target;
        const projectId = sessionStorage.getItem('currentProjectId');
        console.log("🧑‍💻 Template customerOnChangeValueSearch :", name, ":", value)
        // setCustomerValues({ ...customerValues, [name]: value })
        setFormData((prevState)=>({
            ...prevState,
            [name]: value
        }))
        let pathname = window.location.pathname.split('/').pop();

        sessionStorage.setItem(`retained_${pathname}_${projectId}_${values.templateId}`, JSON.stringify({ ...values, [name]: value }))
    }

    return (
        <>
            {headerSearchFieldLists.length > 0 &&
                headerSearchFieldLists.map((fieldInfo, index) => {
                    console.log('fieldInfo',fieldInfo);
                    if (fieldInfo?.fieldType == 3) {
                        let fieldName = fieldInfo?.fieldCode ? fieldInfo?.fieldCode : '';
                        if (fieldInfo?.projectId != 0) {
                            fieldName = `f${colNo}.customerFieldList`;
                            colNo++;
                        }
                        return (
                            <React.Fragment key={index}>
                                <TableControls.Selection
                                    className="ml-2"
                                    defaultValue={fieldInfo.fieldName}
                                    name={fieldName}
                                    options={fieldType3DropdownList(fieldInfo)}
                                    value={values[fieldName]}
                                    onChange={handleChange}
                                />
                            </React.Fragment>
                        );
                    }
                    if (fieldInfo?.fieldType == 4) {
                        let fieldName = fieldInfo?.fieldCode ? fieldInfo?.fieldCode : '';
                        if (fieldInfo?.projectId != 0) {
                            fieldName = `f${colNo}.customerFieldBoolean`;
                            colNo++;
                        }
                        return (
                            <React.Fragment key={index}>
                                <TableControls.Selection
                                    className="ml-2"
                                    defaultValue={fieldInfo?.fieldName}
                                    name={fieldName}
                                    options={fieldType4DropdownList(fieldInfo)}
                                    value={values[fieldName]}
                                    onChange={handleChange}
                                />
                            </React.Fragment>
                        );
                    }
                    if (fieldInfo?.fieldType == 8) {
                        return (
                            <React.Fragment key={index}>
                                <TableControls.Selection
                                    className="ml-2"
                                    defaultValue={fieldInfo.fieldName}
                                    name={fieldInfo?.fieldCode ? fieldInfo?.fieldCode : ''}
                                    options={fieldType8DropdownList(fieldInfo)}
                                    value={values[fieldInfo?.fieldCode ? fieldInfo?.fieldCode : '']}
                                    onChange={handleChange}
                                />
                            </React.Fragment>
                        );
                    }
                    if (fieldInfo?.fieldType == 5) {
                        let fieldName = fieldInfo?.fieldCode ? fieldInfo?.fieldCode : '';
                        if (fieldInfo?.projectId != 0) {
                            fieldName = `f${colNo}.customerFieldInt`;
                            colNo++;
                        }
                        return (
                            <React.Fragment key={index}>
                                {/* <label className="text-blue-100">{fieldInfo?.fieldName}</label> */}
                                <div className="flex flex-col ml-2">
                                    <div className="dx-field-value filter-search text-blue-50 max-w-[11.25rem] ellipsis cursor-pointer search_date_field_dev cdx-DateBox">
                                        <DateBox
                                            name={fieldName}
                                            value={values[fieldName]}
                                            fullName={fieldName}
                                            inputAttr={{
                                                id: fieldName,
                                            }}
                                            elementAttr={{
                                                id: fieldName,
                                            }}
                                            min={dateBoxConfig.min}
                                            max={dateBoxConfig.max}
                                            acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                            onChange={onChangeHandle}
                                            onValueChanged={onValueChangedHandleSD}
                                            placeholder={fieldInfo?.fieldName}
                                            onOptionChanged={onOptionChanged}
                                            showClearButton={true}
                                            showTodayButton={true}
                                            openOnFieldClick={true}
                                            applyButtonText="OK"
                                            applyValueMode="instantly"
                                            type="date"
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    }
                    if (fieldInfo?.fieldType == 6) {
                        let fieldName = fieldInfo?.fieldCode ? fieldInfo?.fieldCode : '';
                        if (fieldInfo?.projectId != 0) {
                            fieldName = `f${colNo}.customerFieldInt`;
                            colNo++;
                        }
                        return (
                            <React.Fragment key={index}>
                                {/* <label className="text-blue-100">{fieldInfo?.fieldName}</label> */}
                                <div className="flex flex-col ml-2">
                                    <div className="dx-field-value filter-search text-blue-50 max-w-[11.25rem] ellipsis cursor-pointer search_date_field_dev cdx-DateBox">
                                        <DateBox
                                            name={fieldName}
                                            value={values[fieldName]}
                                            fullName={fieldName}
                                            inputAttr={{
                                                id: fieldName,
                                            }}
                                            elementAttr={{
                                                id: fieldName,
                                            }}
                                            min={dateBoxConfig.min}
                                            max={dateBoxConfig.max}
                                            acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                            onChange={onChangeHandle}
                                            onValueChanged={onValueChangedHandleSDTime}
                                            placeholder={fieldInfo?.fieldName}
                                            onOptionChanged={onOptionChanged}
                                            showClearButton={true}
                                            showTodayButton={true}
                                            openOnFieldClick={true}
                                            applyButtonText="OK"
                                            applyValueMode="instantly"
                                            interval={dateBoxConfig.interval}
                                            type="time"
                                            pickerType="list"
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    }
                    if (
                        fieldInfo?.fieldType != 4 &&
                        fieldInfo?.fieldType != 3 &&
                        fieldInfo?.fieldType != 8 &&
                        fieldInfo?.fieldType != 6 &&
                        fieldInfo?.fieldType != 5
                    ) {
                        let fieldName = fieldInfo?.fieldCode ? fieldInfo?.fieldCode : '';
                        if (fieldInfo?.projectId != 0) {
                            if (fieldInfo?.fieldType == 7) {
                                fieldName = `f${colNo}.customerFieldInt`;
                            } else { 
                                fieldName = `f${colNo}.customerFieldText`;
                            }
                           
                           
                            colNo++;
                        }
                        return (
                            <React.Fragment key={index}>
                                <TableControls.Search
                                    placeholder={fieldInfo?.fieldName}
                                    className="ml-2"
                                    name={fieldName}
                                    value={values[fieldName]}
                                    onChange={e=>handleOnChangeTextInner(e)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                                />
                            </React.Fragment>
                        );
                    }
                })}
        </>
    );
}