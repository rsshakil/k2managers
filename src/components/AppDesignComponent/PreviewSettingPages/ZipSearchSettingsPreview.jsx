import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  appDesignerState,
  getSelectedPageData,
} from "../../../store/recoil/appDesignerState";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ZipSearchSettingsPreview = ({ pageText, pageId, data }) => {
  const selectRef = useRef(null)
  const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
  const { activeTab, activePageId, tabItems } = recoilStateValue;
  const { classes, styles, info, prefixClass } = data || "";
  let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
  const { requiredCharacters = '', divisionText = '' } = info || {};

  let placeholderCss = `
      label{
        margin-left:0;
      }
      .placeholderClas::placeholder{
          color:${viewSettingData?.placeholderTextColor?.color}
      }
      .labelStyle{
        color:${viewSettingData?.valueTextColor?.color}
      }
      
    `;


  //placeholder custom color for selectbox
  const changeColor = (item) => {
    if (item.target.value == 0) {
      selectRef.current.style.color = viewSettingData?.placeholderTextColor?.color;
    } else {
      selectRef.current.style.color = viewSettingData?.valueTextColor?.color;
    }
  };


  const divisionClass = [
    classes.divisionTextSize,
    classes.divisionTextWeight,
    classes.divisionTextCustomClass,
  ].join(" ");
  const divisionStyle = { ...styles.divisionTextColor };

  const labelClass = [
    classes.labelTextSize,
    classes.labelFontWeight,
    classes.labelCustomClass,
  ].join(" ");
  const labelStyle = { ...styles.labelTextColor, ...styles.labelTextBackgroundColor };

  const requiredClass = [
    classes.requiredTextSize,
    classes.requiredFontWeight,
    classes.requiredCustomClass,
  ].join(" ");
  const requiredStyle = { ...styles.requiredTextColor, ...styles.requiredBackgroundColor }


  const fieldLabel = (labelText = '') => {
    const label = `${labelText}`;
    const mandatoryText = <span className={`${requiredClass}`} style={requiredStyle}>{requiredCharacters}</span>;

    return <>{label} {mandatoryText}</>
  };


  return (
    <>
      <style>{placeholderCss}</style>
      <Formik>
        <form>
          <div className={`${classes.inputWrapCustomClass}`}>
            <div className="flex mb-10 justify-between space-x-1">

              <div className="w-1/2">
                <div className="flex flex-col">
                  <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('ラベル')}</label>

                  <input
                    name="last_name"
                    placeholder="プレイスホルダー"
                    defaultValue=""
                    className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                    style={{
                      color: viewSettingData?.valueTextColor?.color,
                      borderColor: viewSettingData?.borderColor?.borderColor,
                      backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                    }}
                  />
                  <p
                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                    style={{
                      color: viewSettingData?.errorMessageTextColor?.color,
                      backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                    }}
                  >
                    エラーメッセージ
                  </p>
                </div>
              </div>

              {divisionText && (
                <div className="w-1/8 flex items-center justify-center">
                  <div
                    className={`flex items-center justify-center ${classes.divisionTextwrapCustomClass}`}>
                    <span className={`${divisionClass} text-center flex-none pt-1`} style={divisionStyle} >{divisionText}</span>
                  </div>
                </div>
              )}

              <div className="w-1/2">
                <div className="flex flex-col">
                  <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('ラベル')}</label>

                  <input
                    name="last_name"
                    placeholder="プレイスホルダー"
                    className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                    style={{
                      color: viewSettingData?.valueTextColor?.color,
                      borderColor: viewSettingData?.borderColor?.borderColor,
                      backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                    }}
                  />
                  <p
                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                    style={{
                      color: viewSettingData?.errorMessageTextColor?.color,
                      backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                    }}
                  >
                    エラーメッセージ
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('都道府県')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue=""
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('都道府県(半角カナ)')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue="入力テキスト"
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('市区町村')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue=""
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('市区町村(半角カナ)')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue="入力テキスト"
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('番地移行')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue=""
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('番地移行(半角カナ)')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue="入力テキスト"
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('建物など')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue=""
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>

            <div className={`flex flex-col mb-10`}>
              <label className={`${labelClass}`} style={labelStyle} >{fieldLabel('建物など(半角カナ)')}</label>

              <input
                placeholder="プレイスホルダー"
                defaultValue="入力テキスト"
                className={`w-full h-8 p-2 placeholderClas ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderRadius}
                          ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                style={{
                  color: viewSettingData?.valueTextColor?.color,
                  borderColor: viewSettingData?.borderColor?.borderColor,
                  backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor
                }}

              />
              <p
                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                style={{
                  color: viewSettingData?.errorMessageTextColor?.color,
                  backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                }}
              >
                エラーメッセージ
              </p>
            </div>
          </div>
        </form>
      </Formik>
    </>
  );
};
export default ZipSearchSettingsPreview;
