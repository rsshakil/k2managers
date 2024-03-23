import hexToRgba from 'hex-to-rgba';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import '../../components/Calendar/Calendar.css';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';
import Calendar2 from '../Calendar/Calendar2';
import ColorChangeButton from './ColorChangeButton';
import './ColorPicker.css';

import { useRecoilState } from 'recoil';
import { defaultColorCode, isValidColor, RGBAStrToHexA, rgbToObj } from '../../lib/ColorConvert';
import { appDesignerState } from '../../store/recoil/appDesignerState';
import RecentUsedColor from './RecentUsedColor';

const defaultColors = [
    '#000000',
    '#202020',
    '#404040',
    '#606060',
    '#808080',
    '#a0a0a0',
    '#c0c0c0',
    '#e0e0e0',
    '#ffffff',
    '#ff0000',
    '#E60012',
    '#EB6100',
    '#F39800',
    '#FCC800',
    '#FFF100',
    '#CFDB00',
    '#8FC31F',
    '#00FF00',
    '#22AC38',
    '#009944',
    '#009B6B',
    '#009E96',
    '#00A0C1',
    '#00A0E9',
    '#0086D1',
    '#0068B7',
    '#0000FF',
    '#00479D',
    '#1D2088',
    '#601986',
    '#920783',
    '#BE0081',
    '#E4007F',
    '#E5006A',
    '#E5004F',
    '#E60033',
];

const ColorPickerWithRecent = ({
    setColorhandle,
    inputBoxItem,
    labelClassName,
    changeItem,
    pickerLabel = '',
    isBackgroundColor = '',
    isDefaultColor = '',
    updateCustomColorIndex = -1,
}) => {
    if (!isValidColor(isDefaultColor)) {
        isDefaultColor = defaultColorCode;
    }
    const hetToRgbaStr = hexToRgba(isDefaultColor);

    // state
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { tabItems } = recoilStateValue;
    const { colorHistory = [], customColors = [] } = tabItems?.histories;

    const ref = useRef();
    const [hex, setHex] = useState('');
    const [values, setValues] = useState(hetToRgbaStr);
    const [openColorSet, setOpenColorSet] = useState(false); //separate state for color change button
    const [controlComp, setControlComp] = useState(false);

    useEffect(() => {
        setValues(hetToRgbaStr);
        const rbgConvert = rgbToObj(hetToRgbaStr);

        setHex(rbgConvert);
        setOpenColorSet(false);
    }, [hetToRgbaStr]);

    /*------functions for color change button Starts----*/
    const handleColorChange = (color) => {
        setHex(color.rgb);
    };

    const handleClear = () => {
        const hex2 = {
            r: 255,
            g: 255,
            b: 255,
            a: 1,
        };
        const rgbaTohex = `${hex2.r}, ${hex2.g}, ${hex2.b}, ${hex2.a}`;
        localStorage.setItem('Color_Picker2', `${rgbaTohex}`);

        setValues(rgbaTohex);
        setHex('');
        setOpenColorSet(false);

        setColorhandle(changeItem, inputBoxItem, rgbaTohex);
    };

    const handleColorSet = () => {
        //update recent used color history
        updateUsedColorHostory(hex, colorHistory);

        const rgbaTohex = `${hex.r}, ${hex.g}, ${hex.b}, ${hex.a}`;
        localStorage.setItem('Color_Picker2', `${rgbaTohex}`);
        setValues(rgbaTohex);
        setOpenColorSet(false);
        setColorhandle && setColorhandle(changeItem, inputBoxItem, rgbaTohex);
    };
    /*------functions for color change button ENDS----*/

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (openColorSet && ref.current && !ref.current.contains(e.target)) setOpenColorSet(false);
        };

        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => document.removeEventListener('mousedown', checkIfClickedOutside);
    }, [openColorSet]);

    function updateUsedColorHostory(rgba, colorHistory = []) {
        let usedColorHistories = [...colorHistory];
        const hexColor = RGBAStrToHexA(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);

        if (usedColorHistories.includes(hexColor)) {
            const fromIndex = usedColorHistories.indexOf(hexColor);
            const element = usedColorHistories.splice(fromIndex, 1)[0];
            usedColorHistories.splice(0, 0, element);
        } else {
            usedColorHistories = [hexColor, ...colorHistory];
            usedColorHistories.pop();
        }

        let updatedCustomColors = [...customColors];
        if (updateCustomColorIndex >= 0) {
            updatedCustomColors[updateCustomColorIndex] = hexColor;
        }

        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...tabItems,
                histories: {
                    ...tabItems.histories,
                    colorHistory: usedColorHistories,
                    customColors: updatedCustomColors,
                },
            },
        }));
    }

    return (
        <div className="">
            <ColorChangeButton
                showCalendar={openColorSet}
                setShowCalendar={setOpenColorSet}
                value={values}
                title_color={values}
                color_label={pickerLabel}
                color_bg={isBackgroundColor}
                className={`bg-[${values}] border border-solid border-blue-100`}
                labelClassName={labelClassName}
            />

            {openColorSet && (
                <Calendar2
                    className="!h-[550px]"
                    close={() => {
                        setOpenColorSet(false);
                        setControlComp(true);
                    }}
                    setDateValue={setHex}
                    components={
                        <>
                            <div className="flex flex-col h-[460px]">
                                <SketchPicker
                                    color={hex}
                                    presetColors={defaultColors}
                                    onChange={handleColorChange}
                                    width="320px"
                                />
                                <RecentUsedColor colors={customColors} handleOnChangeColor={handleColorChange} />
                                <RecentUsedColor colors={colorHistory} handleOnChangeColor={handleColorChange} />
                            </div>

                            <TimeDatePickerButton handleClear={handleClear} handleSet={handleColorSet} />
                        </>
                    }
                />
            )}
        </div>
    );
};

export default ColorPickerWithRecent;
