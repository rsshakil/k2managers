import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import SelectBox from '../../../components/Form/FormInputs/SelectBox';
import InputContainer from '../../../components/Wrapper/InputContainer';
import CsvExportImportSettingAddTemplateButton from './CsvExportImportSettingAddTemplateButton';
import { DAYS, GENERATION_CYCLE_OPTION, TIMES, WEEKS } from './dataService';

export default function CsvGenerationComponent({
    setFieldValue,
    csvExportTemplateGenerationCycle,
    csvExportTemplateGenerationTiming,
}) {
    const [selectBoxValue, setSelectBoxValue] = useState(0),
        [selectBox2Value, setSelectBox2Value] = useState(''),
        [csvOptions, setCsvOptions] = useState([]);

    useEffect(() => {
        if (csvExportTemplateGenerationCycle) {
            setSelectBoxValue(+csvExportTemplateGenerationCycle);
            if (csvExportTemplateGenerationCycle == 1) {
                setCsvOptions(TIMES);
            } else if (csvExportTemplateGenerationCycle == 2) {
                setCsvOptions(WEEKS);
            } else if (csvExportTemplateGenerationCycle == 3) {
                setCsvOptions(DAYS);
            }
            setSelectBox2Value(csvExportTemplateGenerationTiming);
            setFieldValue('csvExportTemplateGenerationTiming', csvExportTemplateGenerationTiming);
        } else {
            setSelectBoxValue(0);
            setCsvOptions([]);
            setSelectBox2Value('');
            setFieldValue('csvExportTemplateGenerationTiming', 0);
        }
    }, [csvExportTemplateGenerationCycle]);

    const handleTemplateChange = (value) => {
        setSelectBoxValue(+value);
        setFieldValue('csvExportTemplateGenerationCycle', +value);
        if (value == 1) {
            setCsvOptions(TIMES);
            setSelectBox2Value(0);
            setFieldValue('csvExportTemplateGenerationTiming', 0);
        } else if (value == 2) {
            setCsvOptions(WEEKS);
            setSelectBox2Value(0);
            setFieldValue('csvExportTemplateGenerationTiming', 0);
        } else if (value == 3) {
            setCsvOptions(DAYS);
            setSelectBox2Value(0);
            setFieldValue('csvExportTemplateGenerationTiming', 0);
        } else {
            setCsvOptions([]);
            setSelectBox2Value('');
            setFieldValue('csvExportTemplateGenerationTiming', 0);
        }
    };

    return (
        <>
            <InputContainer>
                {/* Generation cycle */}
                <SelectBox
                    label="生成周期"
                    inputClassName="bg-transparent text-blue-100"
                    labelClassName="text-blue-100"
                    border="border-unset border-b-[1px]"
                    name="csvExportTemplateGenerationCycle"
                    defaultValue={selectBoxValue}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                >
                    {GENERATION_CYCLE_OPTION.length > 0 &&
                        GENERATION_CYCLE_OPTION.map((option) => (
                            <option value={option.id} key={option.id}>
                                {option.value}
                            </option>
                        ))}
                </SelectBox>
            </InputContainer>
            <div className="px-10">
                <div className="flex justify-between">
                    <div className="w-full">
                        {/* 生成タイミング  Generation timing */}
                        {selectBoxValue !== 0 &&
                            <InputContainer>
                                {/* Generation cycle */}
                                <SelectBox
                                    label="生成タイミング"
                                    inputClassName="bg-transparent text-blue-100"
                                    labelClassName="text-blue-100"
                                    border="border-unset border-b-[1px]"
                                    name="csvExportTemplateGenerationTiming"
                                    value={selectBox2Value}
                                    onChange={(e) => {
                                        setSelectBox2Value(e.target.value);
                                        setFieldValue('csvExportTemplateGenerationTiming', e.target.value);
                                    }}
                                >
                                    {/* <option key="default" value=""></option> */}
                                    {csvOptions.length > 0 &&
                                        csvOptions.map((csv) => (
                                            <option
                                                value={csv.id}
                                                key={csv.id}
                                                defaultValue={selectBox2Value == csv.id}
                                            >
                                                {csv.value}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
