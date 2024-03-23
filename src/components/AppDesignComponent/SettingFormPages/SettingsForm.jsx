import { useRecoilState } from 'recoil';
import { rgbaTohex } from '../../../lib/ColorConvert';
import { appDesignerState } from '../../../store/recoil/appDesignerState';
import { valueFormatCheck } from '../../../utilities/commonFunctions';

import _ from 'lodash';

const mapper = {
    1: 'classes',
    2: 'styles',
    3: 'prefixClass',
    4: 'info',
    5: 'blocks',
};

const screenSize = {
    1: 'default',
    2: 'sm',
    3: 'md',
    4: 'lg',
    5: 'xl',
    6: '2xl',
};

const styleMapper = {
    bg: 'backgroundColor',
    text: 'color',
    border: 'borderColor',
    shadow: 'shadowColor',
    ring: '--tw-ring-color',
    'ring-offset': 'ringOffsetColor',
    divide: 'borderColor',
    outline: 'outlineColor',
    fill: 'fill',
    stroke: 'stroke',
    accent: 'accentColor',
    from: 'from',
    via: 'via',
    to: 'to',
};

export const tailwindColorCodeKeys = {
    backgroundColor: 'bg',
    borderColor: 'border',
    shadowColor: 'shadow',
    textColor: 'text',
    ringColor: 'ring',
    ringOffsetColor: 'ring-offset',
    divideColor: 'divide',
    outlineColor: 'outline',
    fillColor: 'fill',
    strokeColor: 'stroke',
    accentColor: 'accent',
    from: 'from',
    via: 'via',
    to: 'to',
    boxShadowColor: 'shadow',
};

export default function SettingsForm({ render }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems, appURL } = recoilStateValue;

    const formDataJson = tabItems[activeTab].appSettingQuery[activePageId];
    const { classes = {}, prefixClass = {}, styles = {}, info = {}, blocks = {} } = formDataJson;

    const formData1 = { ...classes, ...prefixClass };
    const formData2 = destructureStylesObj({ ...styles });

    const formData = { ...formData1, ...formData2, ...info, ...blocks, ...prefixClass };

    function handleOnChange(e, attrType = '', prefixKey = '') {
        let attrName = e.target.name;
        let attrValue = e.target.value;

        if (attrType === 3 && prefixKey) {
            handlePrefixClass(attrName, attrValue, prefixKey, attrType, true);
        } else {
            if (attrType === 4) {
                if (attrName != 'tel' && attrName != 'time') {
                    attrValue = valueFormatCheck(attrValue);
                }
                if (attrName == 'token') {
                    var urlReadonly = `${appURL}/?debug=${attrValue}`;
                    updateState('url', urlReadonly, mapper[attrType]);
                }
            }

            updateState(attrName, attrValue, mapper[attrType]);
        }

        if (
            attrName == 'quantity' &&
            (activePageId == 'step1Settings' || activePageId == 'step2Settings' || activePageId == 'step3Settings')
        ) {
            updateStepCounter('stepBoxText', attrValue, mapper[4]);
        }
    }

    function updateStepCounter(key, attrValue, attrType) {
        let currectQtyData = {
            ...tabItems.settings.appSettingQuery[activePageId][attrType][key],
        };

        let existingObjLength = Object.keys(currectQtyData).length;

        let stepBoxes = {};
        for (var i = 1; i <= attrValue; i++) {
            let stepBox = `step${i}`;
            let newStepBoxPrepare = {};
            for (var j = 1; j <= 6; j++) {
                let objK = screenSize[j];
                let stepTextValue = existingObjLength >= i ? currectQtyData[stepBox][objK] : '';
                newStepBoxPrepare[objK] = stepTextValue ?? '';
            }
            stepBoxes[stepBox] = newStepBoxPrepare;
        }

        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                settings: {
                    appSettingQuery: {
                        ...prevState.tabItems.settings.appSettingQuery,
                        [activePageId]: {
                            ...prevState.tabItems.settings.appSettingQuery[activePageId],
                            [attrType]: {
                                ...prevState.tabItems.settings.appSettingQuery[activePageId][attrType],
                                [key]: stepBoxes,
                            },
                        },
                    },
                },
            },
        }));
    }
    const setColorhandle = (name, value, tailwindColorClassKey = '', attrTypes = [], prefixKey = '', peerKey = '') => {
        const hex = rgbaTohex(`rgba(${value})`);
        let updatedColor = null;

        for (let type of attrTypes) {
            if (type === 2) {
                //style
                let namePostFix = '';
                if (prefixKey && !['default', 'placeholder'].includes(prefixKey)) {
                    namePostFix = _.upperFirst(prefixKey);
                }

                updatedColor = { [styleMapper[tailwindColorClassKey]]: hex };
                updateState(name + namePostFix, updatedColor, mapper[type]);
            } else if (type === 3) {
                //prefix class
                let modifiedValue = `${tailwindColorClassKey}-[${hex}]`;
                if (prefixKey && prefixKey !== 'default') {
                    modifiedValue = `${prefixKey}:` + modifiedValue;
                }

                if (peerKey) {
                    modifiedValue = `${peerKey}${modifiedValue}`;
                }

                handlePrefixClass(name, modifiedValue, prefixKey, type);
            } else if (type === 1) {
                //normal class
                let modifiedValue = `${tailwindColorClassKey}-[${hex}]`;

                if (prefixKey) {
                    modifiedValue = prefixKey + ':' + modifiedValue;
                }

                updateState(name, modifiedValue, mapper[type]);
            }
        }
    };

    function handlePrefixClass(attrName, attrValue, prefixKey, attrType, isPreview = false) {
        let currectPrefixData = null;
        if (isPreview) {
            const newName = attrName.replace(`${_.upperFirst(prefixKey)}Preview`, '');
            const newValue = `${prefixKey}:${attrValue}`;
            if (Object.hasOwn(tabItems.settings.appSettingQuery[activePageId][mapper[attrType]][prefixKey], attrName)) {
                currectPrefixData = {
                    ...tabItems.settings.appSettingQuery[activePageId][mapper[attrType]][prefixKey],
                    [attrName]: newValue,
                    [newName]: newValue,
                };
            } else {
                currectPrefixData = {
                    ...tabItems.settings.appSettingQuery[activePageId][mapper[attrType]][prefixKey],
                    [newName]: newValue,
                };
            }
        } else {
            currectPrefixData = {
                ...tabItems.settings.appSettingQuery[activePageId][mapper[attrType]][prefixKey],
                [attrName]: attrValue,
            };
        }

        updateState(prefixKey, currectPrefixData, mapper[attrType]);
        updateOldPrefixValue(attrName, attrValue, prefixKey, currectPrefixData, attrType); //Sakil2023-02-13
    }

    function updateOldPrefixValue(attrName, attrValue, prefixKey, currectPrefixData, attrType) {
        let prepareKeyName = `${attrName}${_.upperFirst(prefixKey)}`;
        let prepareKeyNamePreview = `${attrName}${_.upperFirst(prefixKey)}Preview`;
        if (Object.hasOwn(currectPrefixData, prepareKeyName)) {
            let updateContent = {
                ...tabItems.settings.appSettingQuery[activePageId][mapper[attrType]][prefixKey],
                [attrName]: attrValue,
                [prepareKeyName]: attrValue,
            };
            updateState(prefixKey, updateContent, mapper[attrType]);
        }

        if (Object.hasOwn(currectPrefixData, prepareKeyNamePreview)) {
            let updateContent = {
                ...tabItems.settings.appSettingQuery[activePageId][mapper[attrType]][prefixKey],
                [attrName]: attrValue,
                [prepareKeyNamePreview]: attrValue,
            };
            updateState(prefixKey, updateContent, mapper[attrType]);
        }
    }

    function updateState(key, value, attrType) {
        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                settings: {
                    appSettingQuery: {
                        ...prevState.tabItems.settings.appSettingQuery,
                        [activePageId]: {
                            ...prevState.tabItems.settings.appSettingQuery[activePageId],
                            [attrType]: {
                                ...prevState.tabItems.settings.appSettingQuery[activePageId][attrType],
                                [key]: value,
                            },
                        },
                    },
                },
            },
        }));
    }

    return render({
        formData,
        handleOnChange,
        handleOnChangeColor: setColorhandle,
        updateState: updateState,
        tailwindColorCodeKeys,
    });
}

function destructureStylesObj(stylesObj) {
    return Object.fromEntries(Object.entries(stylesObj).map(([k, v]) => [k, Object.values(v)[0]]));
}
