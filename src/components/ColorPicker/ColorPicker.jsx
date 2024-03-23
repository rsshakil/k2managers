import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import '../../components/Calendar/Calendar.css';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';
import Calendar2 from '../Calendar/Calendar2';
import ColorChangeButton from './ColorChangeButton';
import './ColorPicker.css';

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

const ColorPicker = ({
    setColorhandle,
    inputBoxItem,
    labelClassName,
    changeItem,
    pickerLabel = '',
    isBackgroundColor = '',
    isDefaultColor = '',
}) => {
    const ref = useRef();
    const [hex, setHex] = useState('');
    const [colorValue, setColorValue] = useState('');
    const [values, setValues] = useState(isDefaultColor);
    const [openColorSet, setOpenColorSet] = useState(false); //separate state for color change button
    const [contorlComp, setControlComp] = useState(false);

    // default color picker

    useEffect(() => {
        const rgbaTohex = `${isDefaultColor[0]}, ${isDefaultColor[1]}, ${isDefaultColor[2]}, 100`;

        setValues(rgbaTohex);
        const rbgConvert = {
            a: Number(isDefaultColor[isDefaultColor.length - 1]),
            b: Number(isDefaultColor[2]),
            g: Number(isDefaultColor[1]),
            r: Number(isDefaultColor[0]),
        };
        setHex(rbgConvert);
        setOpenColorSet(false);
    }, [isDefaultColor]);
    useEffect(() => {
        const colorGet = localStorage.getItem('Color_Picker2');
        if (colorGet) {
            const rgbaGet = colorGet.split(',');
            const rbgConvert = {
                a: Number(rgbaGet[rgbaGet.length - 1]),
                b: Number(rgbaGet[2]),
                g: Number(rgbaGet[1]),
                r: Number(rgbaGet[0]),
            };
            setHex(rbgConvert);
            setControlComp(false);
        } else {
            setHex('');
            setControlComp(false);
        }
        setControlComp(false);
    }, [contorlComp]);

    const handleColorChange = (color) => {
        setHex(color.rgb);
    };
    const handleClear = () => {
        const hex2 = {
            r: 255,
            g: 255,
            b: 255,
            a: 100,
        };
        const rgbaTohex = `${hex2.r}, ${hex2.g}, ${hex2.b}, ${hex2.a}`;
        localStorage.setItem('Color_Picker2', `${rgbaTohex}`);
        setValues(rgbaTohex);
        setHex('');
        setOpenColorSet(false);
        setColorhandle(changeItem, inputBoxItem, rgbaTohex);
    };
    const handleColorSet = () => {
        const rgbaTohex = `${hex.r}, ${hex.g}, ${hex.b}, ${hex.a}`;
        localStorage.setItem('Color_Picker2', `${rgbaTohex}`);
        setValues(rgbaTohex);
        setOpenColorSet(false);
        setColorhandle && setColorhandle(changeItem, inputBoxItem, rgbaTohex);
    };

    function rgba2hex(rgba) {
        rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return rgba && rgba.length === 4
            ? '#' +
                  ('0' + parseInt(rgba[1], 10).toString(16)).slice(-2) +
                  ('0' + parseInt(rgba[2], 10).toString(16)).slice(-2) +
                  ('0' + parseInt(rgba[3], 10).toString(16)).slice(-2)
            : '';
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (openColorSet && ref.current && !ref.current.contains(e.target)) setOpenColorSet(false);
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => document.removeEventListener('mousedown', checkIfClickedOutside);
    }, [openColorSet]);

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
                    close={() => {
                        setOpenColorSet(false);
                        setControlComp(true);
                    }}
                    setDateValue={setHex}
                    components={
                        <>
                            <div className="flex flex-col h-[426px]">
                                <SketchPicker
                                    color={hex}
                                    presetColors={defaultColors}
                                    onChange={handleColorChange}
                                    width="320px"
                                />
                            </div>
                            <TimeDatePickerButton handleClear={handleClear} handleSet={handleColorSet} />
                        </>
                    }
                />
            )}
        </div>
    );
};

export default ColorPicker;
