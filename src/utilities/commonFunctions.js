
import _ from 'lodash';
import { pageBlockTypes, buttonValidationKeys, fieldNameValidateKeys } from "../lib/commonConstants";
const nonCountableBlocks = [
    'INPUT_DATE_SETTINGS_BLOCK',
    'BIRTHDAY_SETTINGS_BLOCK',
    'INPUT_BIRTHDAY',
    'INPUT_TIME_SETTINGS_BLOCK',
    'INPUT_TEXTAREA_SETTINGS_BLOCK',
    'CHECKBOX_SETTINGS_BLOCK',
    'RADIOA_SETTINGS_BLOCK',
    'RADIO_A',
    'RADIOB_SETTINGS_BLOCK',
];
const countableBlocks = {
    'JOIN_INPUT_FORM_SETTINGS_BLOCK': 'numberOfCombine',
    'COMBINE_INPUT_TEXT': 'numberOfCombine',
    'INPUT_TEXT_SETTINGS_BLOCK': 'columns',
    'INPUT_TEXT': 'columns',
    'ZIP_CODE_SEARCH_SETTINGS_BLOCK': 'numberOfInputItems',
    'ZIP_CODE_SEARCH': 'numberOfInputItems',
    'SELECT_SETTINGS_BLOCK': 'areaNumberQuantity',
    'OPTION_SELECT': 'areaNumberQuantity',
    'INPUT_NUMBER_SETTINGS_BLOCK': 'inputNumberQuantity',
    'TWO_TOKEN_LOGIN': 'divisionNumber',
    'TWO_TOKEN_LOGIN_1': 'divisionNumber',
    'TWO_TOKEN_LOGIN_2': 'divisionNumber'

};

export const blockListTypes = (keys = ['HORIZONTAL_LINE'], ignore = true) => {
    if (ignore) {
        return _.filter(pageBlockTypes, (v) => !_.includes(keys, v.key));
    }

    return _.filter(pageBlockTypes, (v) => _.includes(keys, v.key));
}


export const isPositiveInteger = (value = '') => {
    if (value) {
        const er = /^\d*[1-9]\d*$/;

        return er.test(value);
    }

    return true;
}

export const isNumeric = (value) => {
    const re = /^-?[0-9]\d*(\.\d+)?$/;
    return re.test(value);
}

//? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : value

export const numberWithComma = (value) => {
    console.log('<<<<<<<<<oooo>>>>>>>>>>>>>>', value)
};

export const blockTitle = (data) => {
    let title = "[" + data.blockPageTitle + "]";
    switch (data.key) {
        case 'BUTTON':
            const buttonTitles = [data.button1Text, data.button2Text].filter(e => e);
            title += buttonTitles.join(',');
            break;

        case 'INFORMATION_AREA':
            const infoAreaTitles = [data.informationAreaTitle];
            title += infoAreaTitles.join(',');
            break;

        case 'TEXT_LINK':
            const textLinkTitles = [data.linkText];
            title += textLinkTitles.join(',');
            break;

        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
            const hTitles = [data.headingText];
            title += hTitles.join(',');
            break;

        default:
            break
    }

    return title;
}

export const valueFormatCheck = (str) => {
    if (str != '') {
        if (isNaN(str)) {
            console.log('stringCheckis', str);
            if (str.toLowerCase() === 'true' || str.toLowerCase() === 'false') {
                return (str.toLowerCase() === 'true');
            }
            return str;
        }
        console.log('stringCheckns', str);

        return /^0\d+$/.test(str) ? str : isNumeric(str) ? parseInt(str) : str;
    } else {
        return str;
    }
}

export const timeFormat = (value) => {
    // console.log("-- Time formatter bus way time picker --");
    try {
        let value2 = "";
        if (value) { // checking value is there or not fixed by linkon 11-10-22
            if (String(value).length == 3) {
                value2 = "0" + String(value.slice(0, 1)) + ":" + String(value.slice(-2))
            }
            else {
                value2 = String(value.slice(0, 2)) + ":" + String(value.slice(-2))
            }
            // console.log("Time Formate:", value2);
            // console.log("-- Time formatter bus way time picker --", value2);
            return value2
        }
    } catch (error) {
        console.log("Time format error bus way time picker", error);
        return "00:00";
    }
}

export const intToDateFormat = (value) => {
    if (value != '') {
        if (typeof value === 'string' && value.includes('/')) {
            return value;
        } else {
            let dateFormat = new Date(value * 1000);
            console.log("Date: " + dateFormat.getDate() +
                "/" + (dateFormat.getMonth() + 1) +
                "/" + dateFormat.getFullYear() +
                " " + dateFormat.getHours() +
                ":" + dateFormat.getMinutes() +
                ":" + dateFormat.getSeconds());
            let day = `${dateFormat.getDate()}`;
            let month = `${(dateFormat.getMonth() + 1)}`;
            day = day.length == 1 ? `0${day}` : day;
            month = month.length == 1 ? `0${month}` : month;

            return `${dateFormat.getFullYear()}/${month}/${day}`;
        }
    }
    return value;
}

export const intToTimeFormat = (value) => {
    if (value != '') {
        if (typeof value === 'string' && value.includes(':')) {
            return value;
        } else {
            console.log('timevalue', value);
            let dateFormat = new Date(value);
            console.log("Date: " + dateFormat.getDate() +
                "/" + (dateFormat.getMonth() + 1) +
                "/" + dateFormat.getFullYear() +
                " " + dateFormat.getHours() +
                ":" + dateFormat.getMinutes() +
                ":" + dateFormat.getSeconds());
            let hour = `${dateFormat.getHours()}`;
            hour = hour.length == 1 ? `0${hour}` : hour;
            let min = `${dateFormat.getMinutes()}`;
            min = min.length == 1 ? `0${min}` : min;
            console.log('hour', hour.length);
            console.log('min', min.length);
            return `${hour}:${min}`;
        }
    }
    return value;
}
export const BlockFieldValidate = (formData, tabItems) => {
    if (buttonValidationKeys.includes(formData.key)) {
        //startValidating
        console.log('alltabitems', tabItems);
        console.log('>>>>>formData', formData);
        console.log('>>>>>buttonValidationKeys', buttonValidationKeys);
        console.log('>>>>>fieldNameValidateKeys', fieldNameValidateKeys);
        let validateNameList = getfilterablefieldValueList(formData);
        let requiredValidatationCheck = isAllRequiredValidation(validateNameList, formData);
        if (!requiredValidatationCheck) {
            return { err: '必須項目を確認してください' }
        }
        console.log('requiredValidatationCheck', requiredValidatationCheck);
        validateNameList = validateNameList.filter(item => item != '');
        console.log('validateNameList', validateNameList);
        if (validateNameList.length > 0) {
            let isEmptyOrDuplicateFilter = validateNameList.filter((item, index) => validateNameList.indexOf(item) != index);
            console.log('isEmptyOrDuplicateFilter', isEmptyOrDuplicateFilter);
            if (isEmptyOrDuplicateFilter.length > 0) {
                //emptyField value found
                console.log('value empty or duplicate Error occur')
                return { err: 'name属性の重複エラーが発生しました（サイト内で重複使用はできません）' };
            } else {
                //unique check
                let getAllBlocks = blockProcessData(tabItems);
                console.log('getAllBlocks', getAllBlocks);
                let filterAllBlocks = getAllBlocks.length > 0 && getAllBlocks.filter(item => item.appPageBlockId != formData.appPageBlockId);
                let existingFieldValueList = checkUniqueFieldValue(filterAllBlocks);
                console.log('existingFieldValueList', existingFieldValueList)
                let matchFound = true;
                if (existingFieldValueList.length > 0) {
                    for (let i = 0; i < validateNameList.length; i++) {
                        if (existingFieldValueList.includes(validateNameList[i])) {
                            matchFound = { err: 'name属性の重複エラーが発生しました（サイト内で重複使用はできません）' };
                            break;
                        }
                    }
                }
                return matchFound;
            }
        } else {
            console.log('validation not field no found');
            return true;
        }
    } else {
        console.log('this is not a validatable block no need to unique check');
        return true;
    }
}
function checkUniqueFieldValue(getAllBlocks) {
    let blockfilterablefieldValueList = [];
    getAllBlocks.length > 0 && getAllBlocks.map((block) => {
        blockfilterablefieldValueList = blockfilterablefieldValueList.concat(getfilterablefieldValueList(block));
    });
    console.log('blockfilterablefieldValueList', blockfilterablefieldValueList);
    return blockfilterablefieldValueList;
}
function isAllRequiredValidation(validateNameList, formData) {
    if (nonCountableBlocks.includes(formData.key)) {
        console.log('its a nonCountable block');
        let onlySingleNameKeyValidate = [
            'CHECKBOX_SETTINGS_BLOCK',
            'RADIOA_SETTINGS_BLOCK',
            'RADIO_A',
            'RADIOB_SETTINGS_BLOCK',
        ];
        if (onlySingleNameKeyValidate.includes(formData.key)) {
            if (formData.name == '') {
                console.log('reQuiredValidationFiredForSingleName');
                return false;
            } else {
                return true;
            }
        } else if (formData.key == 'INPUT_TIME_SETTINGS_BLOCK') {
            if (formData.division === false && formData.name == '') {
                console.log('reQuiredValidationINPUT_TIME_SETTINGS_BLOCK');
                return false;
            } else if (formData.division === true) {
                if (formData.hourName == '' || formData.minuteName == '') {
                    console.log('reQuiredValidationINPUT_TIME_SETTINGS_BLOCK');
                    return false;
                }
            }
        } else if (formData.key == 'INPUT_DATE_SETTINGS_BLOCK') {
            if (formData.division === false && formData.name == '') {
                console.log('reQuiredValidationINPUT_TIME_SETTINGS_BLOCK');
                return false;
            } else if (formData.division === true) {
                if (formData.yearName == '' || formData.monthName == '' || formData.dayName == '') {
                    console.log('reQuiredValidationINPUT_TIME_SETTINGS_BLOCK');
                    return false;
                }
            }
        }
        else {
            let isAnyFieldEmpty = validateNameList.filter(item => item == '');
            console.log('isAnyFieldEmpty', isAnyFieldEmpty.length);
            if (isAnyFieldEmpty.length > 0) {
                console.log('reQuiredValidationFired');
                return false;
            }

        }

    } else if (countableBlocks.hasOwnProperty(formData.key)) {
        console.log('its a Countable block');
        if (formData.key == 'TWO_TOKEN_LOGIN_2') {
            if (formData?.passwordName == '') {
                console.log('reQuiredValidationFired');
                return false;
            }
        }
        let validationStatus = true;
        console.log('numberOfFieldQuantity', formData[countableBlocks[formData.key]]);
        for (let i = 0; i < formData[countableBlocks[formData.key]]; i++) {
            if (validateNameList[i] == '') {
                console.log('reQuiredValidationFired11111');
                validationStatus = false;
                break;
            }
        }
        return validationStatus;
    }

    return true;
}
function getfilterablefieldValueList(obj) {
    let {
        name,
        area1Name,
        area2Name,
        area3Name,
        area4Name,
        area5Name,
        yearName,
        monthName,
        dayName,
        hourName,
        minuteName,
        input1Name,
        input2Name,
        input3Name,
        input4Name,
        input5Name,
        input6Name,
        t1Area1Name,
        t1Area2Name,
        t1Area3Name,
        t1Area4Name,
        id1Name,
        id2Name,
        id3Name,
        id4Name,
        passwordName,
    } = obj;
    let validateNameList = [
        name,
        area1Name,
        area2Name,
        area3Name,
        area4Name,
        area5Name,
        yearName,
        monthName,
        dayName,
        hourName,
        minuteName,
        input1Name,
        input2Name,
        input3Name,
        input4Name,
        input5Name,
        input6Name,
        t1Area1Name,
        t1Area2Name,
        t1Area3Name,
        t1Area4Name,
        id1Name,
        id2Name,
        id3Name,
        id4Name,
        passwordName
    ].filter(e => typeof e !== 'undefined');
    return validateNameList;
}
function blockProcessData(tabItems = {}) {
    let masterBlocks = [];

    const modifiedFreePages = tabItems.freePages.map((x) => {
        if (x.isNewPage) {
            x = _.omit(x, ['appPageId', 'isNewPage']);
        }

        masterBlocks = [...masterBlocks, ...x.blocks];
        return x;
    });

    const modifiedCommonPages = tabItems.commonPages.map((x) => {
        if (x.isNewPage) {
            x = _.omit(x, ['appCommonPageId', 'isNewPage']);
        }

        masterBlocks = [...masterBlocks, ...x.blocks];
        return x;
    });

    let settingBlocks = _.without(_.map(tabItems.settings.appSettingQuery, 'blocks'), undefined, null);
    settingBlocks = _.map(settingBlocks, (x) => Object.values(x));
    settingBlocks = settingBlocks.reduce((flattened, value) => {
        return flattened.concat(_.flatten(value));
    }, []);

    masterBlocks = [...masterBlocks, ...settingBlocks];

    let flatMasterBlocks = generateMasterBlocks(masterBlocks);
    flatMasterBlocks = flatMasterBlocks.filter(item => buttonValidationKeys.includes(item.key))
    return flatMasterBlocks;
    // flatMasterBlocks = flatMasterBlocks.reduce(
    //     (obj, item) => ((obj[item.appPageBlockId] = _.omit(item, 'addNewItem')), obj),
    //     {}
    // ); // to make array to object

    // console.log('masterBlocks >>>>>>>>>>>>', flatMasterBlocks);

    // return { 
    //     ...tabItems,
    //     freePages: modifiedFreePages,
    //     commonPages: modifiedCommonPages,
    //     blocks: flatMasterBlocks,
    // };
}

function generateMasterBlocks(blocks = []) {
    let result = [];
    blocks.forEach(function (a) {
        result.push(a);

        if (a.key === 'BUTTON' && (a.hasOwnProperty('button1blocks') || a.hasOwnProperty('button2blocks'))) {
            const { button1blocks = [], button2blocks = [] } = a;
            let mergerButtonBlocks = [...button1blocks, ...button2blocks];

            result = result.concat(generateMasterBlocks(mergerButtonBlocks));
        } else if (a.hasOwnProperty('blocks') && a.blocks.length > 0) {
            result = result.concat(generateMasterBlocks(a.blocks));
        }
    });

    return result;
}

export const intToTimeFormatForDB = (value) => {
    if (value !== '') {
        let dateFormat = new Date(value);
        let hour = `${dateFormat.getHours()}`;
        console.log('hour>>>>>>', hour);
        hour = hour.length === 1 ? `${hour}` : hour;
        let min = `${dateFormat.getMinutes()}`;
        console.log('min>>>>>>', min);
        min = min.length === 1 ? `0${min}` : min;
        console.log(`${hour}${min}`)
        return `${hour}${min}`;
    }
    return value;
};


export const twoArrayHaveSameItem = (arr1 = [], arr2 = [], property = 'fieldCode') => {
    // Create a set of unique property values from arr2
    const arr2PropertySet = new Set(arr2.map(item => item[property]));

    // Check if all items in arr1 exist in arr2 based on the specified property
    for (const item1 of arr1) {
        if (arr2PropertySet.has(item1[property])) {
            return true; // Found an item in arr1 that exist in arr2
        }
    }
    return false; // All arrays holding unique items
}