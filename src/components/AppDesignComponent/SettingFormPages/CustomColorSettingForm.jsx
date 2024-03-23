import { useRecoilState, useRecoilValue } from "recoil";
import { Formik, Form } from "formik";
import _ from 'lodash';

import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";
import { rgbaTohex } from "../../../lib/ColorConvert";


export default function CustomColorSettingForm() {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { customColors = [] } = tabItems?.histories;

    const handleOnChangeColor = (name, value, index, convert = false) => {
        let hex = value; 
        if (convert) {
            hex = rgbaTohex(`rgba(${value})`);

        } 
        updateCustomColorState(hex, index);
    }

    function updateCustomColorState(value, index) {
        let updatedCustomColors = [...customColors];
        updatedCustomColors[index] = value;

        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: { ...tabItems, histories: { ...tabItems.histories, customColors: updatedCustomColors } }
        }))
    }


    return (
        <Formik>
            <div className='relative w-full'>
                <Form>
                    <div className="flex flex-col mb-4">
                        {selectedPageDetail.map((x, index) => (
                            <div key={index} className="mb-4">
                                <label htmlFor="" className="text-blue-100 text-xs ml-0">カスタムカラー{index + 1}</label>
                                <div className="flex justify-start app-design-color-picker">
                                    <ColorPickerWithRecent
                                        pickerLabel=""
                                        isBackgroundColor="1"
                                        // setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, index, true)}
                                        inputBoxItem={`index${index + 1}`}
                                        isDefaultColor={x}
                                        updateCustomColorIndex={index}
                                    />

                                    <InputContainer className="flex-1">
                                        <TextBox
                                            name={`index${index + 1}`}
                                            placeholder="16進数で8桁入力して下さい。例）#11223344ff"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={x}
                                            onChange={(e) => handleOnChangeColor(e.target.name, e.target.value, index)}
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form>
            </div>
        </Formik>

    );
}