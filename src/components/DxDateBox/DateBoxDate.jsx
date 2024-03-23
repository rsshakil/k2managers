import { DateBox } from 'devextreme-react';
import React from 'react';

const dateBoxConfig = {
    acceptCustomValue: false,
    interval: 15,
    default: new Date(2023, 0, 3, 0, 1, 3),
    min: new Date(1800, 0, 1, 0, 0, 0),
    max: new Date(2050, 0, 1, 0, 0, 0),
};

const DateBoxDate = ({ setDateValueDate, placeholder, dateValue }) => {
    const date = dateValue && new Date(dateValue); 

    const handleValueChanged = (e) => {
        setDateValueDate(prepareDateValue(e.value));
    };

    const prepareDateValue = (value) => {
        let dateFormat = new Date(value);
        let day = `${dateFormat.getDate()}`;
        let month = `${dateFormat.getMonth() + 1}`;
        day = day.length === 1 ? `0${day}` : day;
        month = month.length === 1 ? `0${month}` : month;

        return `${dateFormat.getFullYear()}/${month}/${day}`;
    };

    return (
        <DateBox
            defaultValue={date || undefined}
            width="38rem" 
            type="date"
            applyButtonText="OK"  
            showClearButton={true} 
            min={dateBoxConfig.min}
            max={dateBoxConfig.max} 
            placeholder={placeholder}  
            cancelButtonText="キャンセル" 
            onValueChanged={handleValueChanged}
            displayFormat="yyyy/MM/dd"
            acceptCustomValue={dateBoxConfig.acceptCustomValue}
            applyValueMode='useButtons'
        />
    );
};

export default DateBoxDate;
