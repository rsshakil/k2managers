import _ from 'lodash';
import ErrorText from "../../shared/ErrorText";
import Label from "./elements/Label";
import Divider from "./elements/Divider";
import DivideHelper from './elements/DivideHelper';

export default function InputDateSettingPreview(props) {
    const {
        info = {},
        labelClass = '',
        labelStyle = {},
        requiredClass = '',
        requiredStyle = {},
        inputClass = '',
        inputWrapCustomClass = '',
        inputStyle = {},
        errorMessageClass = '',
        errorMessageStyle = {},
        divideClass = '',
        divideWrapClass = '',
        divideStyle = {},
    } = props;

    const { divisionText, requiredCharacters, } = info;


    const errorElement = (
        <div className="w-1/2 flex flex-col">
            <ErrorText errorType='custom' customErrorText="エラーメッセージ" classes={errorMessageClass} styles={errorMessageStyle} />
        </div>
    )


    return (
        <>
            <div className={`flex flex-col ${inputWrapCustomClass}`}>
                <Label
                    labelClass={labelClass}
                    labelStyle={labelStyle}
                    labelText="フォーム名"
                    requiredClass={requiredClass}
                    requiredStyle={requiredStyle}
                    requiredText={requiredCharacters}
                />

                <input type={`date`} name="last_name" className={`${inputClass}`} defaultValue="2022-11-01" placeholder="プレイスホルダー" style={inputStyle} />
                <ErrorText errorType='custom' customErrorText="エラーメッセージ" classes={errorMessageClass} styles={errorMessageStyle} />
            </div>

            <DivideHelper
                dividerText={divisionText}
                dividerWrapClass={divideWrapClass}
                dividerClass={divideClass}
                dividerStyle={divideStyle}
            >
                {(divideWidth) => {
                    return (
                        <div className={`${inputWrapCustomClass}`}>
                            <div className="flex">
                                <div className="w-1/2 flex flex-col">
                                    <Label
                                        labelClass={labelClass}
                                        labelStyle={labelStyle}
                                        labelText="フォーム名"
                                        requiredClass={requiredClass}
                                        requiredStyle={requiredStyle}
                                        requiredText={requiredCharacters}
                                    />
                                </div>

                                <Divider
                                    dividerWrapClass={divideWrapClass}
                                    dividerClass={divideClass}
                                    dividerStyle={{ ...divideStyle, minWidth: divideWidth }}
                                    dividerText={''}
                                />

                                <div className="w-1/2 flex flex-col">
                                    <Label
                                        labelClass={labelClass}
                                        labelStyle={labelStyle}
                                        labelText="フォーム名"
                                        requiredClass={requiredClass}
                                        requiredStyle={requiredStyle}
                                        requiredText={requiredCharacters}
                                    />
                                </div>

                                <Divider
                                    dividerWrapClass={divideWrapClass}
                                    dividerClass={divideClass}
                                    dividerStyle={{ ...divideStyle, minWidth: divideWidth }}
                                    dividerText={''}
                                />

                                <div className="w-1/2 flex flex-col">
                                    <Label
                                        labelClass={labelClass}
                                        labelStyle={labelStyle}
                                        labelText="フォーム名"
                                        requiredClass={requiredClass}
                                        requiredStyle={requiredStyle}
                                        requiredText={requiredCharacters}
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-1/2 flex flex-col">
                                    <select className={`select-icon px-2 ${inputClass}`} style={inputStyle}>
                                        {_.range(1900, 2100).map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>

                                <Divider
                                    dividerWrapClass={divideWrapClass}
                                    dividerClass={divideClass}
                                    dividerStyle={divideStyle}
                                    dividerText={divisionText}
                                />

                                <div className="w-1/2 flex flex-col">
                                    <select className={`select-icon px-2 ${inputClass}`} style={inputStyle}>
                                        {_.range(1, 13).map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>

                                <Divider
                                    dividerWrapClass={divideWrapClass}
                                    dividerClass={divideClass}
                                    dividerStyle={divideStyle}
                                    dividerText={divisionText}
                                />

                                <div className="w-1/2 flex flex-col">
                                    <select className={`select-icon px-2 ${inputClass}`} style={inputStyle}>
                                        {_.range(1, 32).map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex">
                                {errorElement}

                                <Divider
                                    dividerWrapClass={divideWrapClass}
                                    dividerClass={divideClass}
                                    dividerStyle={{ ...divideStyle, minWidth: divideWidth }}
                                    dividerText={''}
                                />

                                {errorElement}

                                <Divider
                                    dividerWrapClass={divideWrapClass}
                                    dividerClass={divideClass}
                                    dividerStyle={{ ...divideStyle, minWidth: divideWidth }}
                                    dividerText={''}
                                />

                                {errorElement}
                            </div>
                        </div>
                    )
                }}
            </DivideHelper>
        </>
    )

}