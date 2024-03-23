import { DateBox } from 'devextreme-react';
import React, { useState } from 'react';

const dateBoxConfig = {
    acceptCustomValue: false, 
    default: new Date(2023, 0, 3, 0, 1, 3),
    min: new Date(1800, 0, 1, 0, 0, 0),
    max: new Date(2050, 0, 1, 0, 0, 0),
};

const DxDateBox = (props) => {
    const { setDateValueDate, setTimeValue, placeholder, dateValue, timeValue, formType } = props
    const date = (dateValue && timeValue && new Date(`${dateValue} ${timeValue}`));
    const [opened, setOpened] = useState(false);

    const handleInput = (e) => { 
        let { date, time } = prepareDateValue(e.event.target.value);
        setDateValueDate(date);
        setTimeValue(time);
    };

    const handleValueChanged = (e) => { 
        let { date, time } = prepareDateValue(e.value);
        setDateValueDate(date);
        setTimeValue(time);
    }

    const prepareDateValue = (value) => {
        let dateFormat = new Date(value);
        let day = `${dateFormat.getDate()}`;
        let month = `${dateFormat.getMonth() + 1}`;
        day = day.length === 1 ? `0${day}` : day;
        month = month.length === 1 ? `0${month}` : month;

        let hour = `${dateFormat.getHours()}`.trim();
        let min = `${dateFormat.getMinutes()}`.trim();
        let sec = `${dateFormat.getSeconds()}`.trim();
        hour = hour.length === 1 ? `0${hour}` : hour;
        min = min.length === 1 ? `0${min}` : min;
        sec = sec.length === 1 ? `0${sec}` : sec;

        return {
            date: `${dateFormat.getFullYear()}/${month}/${day}`,
            time: `${hour}:${min}:${sec}`,
        };
    };

    return (
        <div>
        {formType === 'add' ? (
            <DateBox
                defaultValue={date || undefined}
                width="38rem"
                opened={opened}
                type="datetime"
                applyButtonText="OK"
                showMaskMode="always"
                pickerType="calender"
                useMaskedValue={true}
                onInput={handleInput}
                showClearButton={true}
                useMaskBehavior={true}
                min={dateBoxConfig.min}
                max={dateBoxConfig.max}
                openOnFieldClick={true}
                placeholder={placeholder}
                showDropDownButton="false"
                applyValueMode="useButtons"
                cancelButtonText="キャンセル"
                onOpened={() => setOpened(true)}
                onClosed={() => setOpened(false)}
                onValueChanged={handleValueChanged}
                displayFormat="yyyy/MM/dd HH:mm:ss"
                acceptCustomValue={dateBoxConfig.acceptCustomValue}
                buttons={[
                    { name: 'clear' },
                    {
                        name: 'customDropDown',
                        options: { icon: 'event', stylingMode: 'outlined', onClick: () => setOpened(!opened) },
                    },
                ]}
            />
        ) : (
            <DateBox
                value={date}
                width="38rem"
                opened={opened}
                type="datetime"
                applyButtonText="OK"
                showMaskMode="always"
                pickerType="calender"
                useMaskedValue={true}
                onInput={handleInput}
                showClearButton={true}
                useMaskBehavior={true}
                min={dateBoxConfig.min}
                max={dateBoxConfig.max}
                openOnFieldClick={true}
                placeholder={placeholder}
                showDropDownButton="false"
                applyValueMode="useButtons"
                cancelButtonText="キャンセル"
                onOpened={() => setOpened(true)}
                onClosed={() => setOpened(false)}
                onValueChanged={handleValueChanged}
                displayFormat="yyyy/MM/dd HH:mm:ss"
                acceptCustomValue={dateBoxConfig.acceptCustomValue}
                buttons={[
                    {
                        name: 'customDropDown',
                        options: { icon: 'event', stylingMode: 'outlined', onClick: () => setOpened(!opened) },
                    },
                ]}
            />
        )}
        </div>
    );
};

export default DxDateBox;