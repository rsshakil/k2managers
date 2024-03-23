import { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { locale } from 'devextreme/localization';
import FilterBuilder, { CustomOperation } from 'devextreme-react/filter-builder';
import { fieldsValueJSON } from './data';
import { filterOperationDescriptionsData, groupOperations } from './FilterBuilderConfigData';
import dxFilterBuilderLib from './dxFilterBuilderLib';
import filterBuilderConfig from './filterBuilderConfig';
import { baseURL, listFieldQuery, listMethod } from '../../restapi/queries';
import FilterErrorBoundary from './FilterErrorBoundary';
import { instance } from '../../services/axios.js';
import Loader from '../Loading/Loader';
import { FilterRangeEditorComponent } from './FilterRangeEditorComponent';
import { FilterRegexEditorComponent } from './FilterRegexEditorComponent';
import { FilterSameEditorComponent } from './FilterSameEditorComponent';
import { FilterMinlengthEditorComponent } from './FilterMinlengthEditorComponent';
import { FilterMaxlengthEditorComponent } from './FilterMaxlengthEditorComponent';
import { FilterListEditorComponent } from './FilterListEditorComponent';
import { FilterDateTypeEditorComponent } from './FilterDateTypeEditorComponent';
import { FilterDateRangeTypeEditorComponent } from './FilterDateRangeTypeEditorComponent';


import { regularExpressionCategories } from './query.js';
import { nowRangeCategories } from './query.js';

export default function DxFilterBuilder({ info: { page, maxGroupLevel, fieldQuery } }) {
    locale('ja-JP');
    // route name get to fetch local storage data
    const pathname = window.location.pathname;
    let routeName = pathname.split('/').pop();
    const [loading, setLoading] = useState(true);
    const [dxConfig, setDxConfig] = useState({
        overrideOnValueChanged: filterBuilderConfig.overrideOnValueChanged,
    }),
        [filterValue, setFilterValue] = useState([]),
        [fields, setFields] = useState([]);

    const filterOperationDescriptions = filterOperationDescriptionsData;

    useEffect(() => {
        let fieldStyleList = [];
        let sameFieldList = [];
        const ENDPOINT = `${baseURL}${listFieldQuery}?pid=${window.sessionStorage.getItem('currentProjectId')}`;
        (async () => {
            try {
                setLoading(true);
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                const result = await response.data;
                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    for (let i = 0; i < result.records.length; i++) {
                        if (result.records[i].caption) {
                            fieldStyleList.push(result.records[i]);
                            let style = {
                                id: result.records[i].name,
                                // id: result?.records[i]?.fieldColumnName,
                                name: result.records[i].caption,
                            };
                            sameFieldList.push(style);
                        }
                    }
                }
                if (fieldQuery) {
                    dxFilterBuilderLib.storeInLS({ fields: fieldStyleList, values: fieldQuery }, page);
                } else {
                    dxFilterBuilderLib.storeInLS({ fields: fieldStyleList }, page);
                }

                window.sessionStorage.setItem('field_parameter', JSON.stringify(sameFieldList));

                let { filterBuilderConditionsArray, fieldsLS } = dxFilterBuilderLib.getLsConvertArrayShowDxFilter(page);
                setFields(fieldsLS);
                // console.log("xxx---------------4");
                fieldQuery !== undefined
                    ? setFilterValue(fieldQuery.map(processDate))
                    : setFilterValue(filterBuilderConditionsArray);
            } catch (error) {
                console.log('Error Fetching Data', error);
            } finally {
                // console.log("xxx---------------5");
                setLoading(false);
            }
        })();
    }, []);

    // ネストされた配列を舐めて、日付を見つけたらDateオブジェクトに置き換える
    function processDate(val) {
        if (val instanceof Array) {
            return val.map(processDate);
        } else {
            if (typeof val == 'string' && val.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)) {
                return new Date(val);
            } else {
                return val;
            }
        }
    }

    // 2022/12/26 ADD TATSU
    // Converting date type values
    function convertDate(val) {
        const toString = Object.prototype.toString;
        if (toString.call(val).slice(8, -1) === 'Date') {
            const dt = new Date(val);
            if (dt.getHours() === 0) {
                // Shift 9 hours according to JST
                const jdt = new Date(dt.getTime() + 9 * 60 * 60 * 1000);
                const isoStr = jdt.toISOString();
                return isoStr;
            } else {
                return val;
            }
        } else {
            return val;
        }
    }

    // 2022/12/26 ADD TATSU
    // 値の配列をループして、valueの型が"Date"を検索する
    // ex) {'birthday', '=', }
    function checkDateFormat(val) {
        for (let i = 0; i < val.length; i++) {
            // For condition
            if (val.length == 3 && val[1] != 'and' && val[1] != 'or') {
                if (!Array.isArray(val[2])) {
                    val[2] = convertDate(val[2]);
                }
                // For array, maybe a date range
                else {
                    let values = [];
                    for (let i = 0; i < val[2].length; i++) {
                        let newVal = convertDate(val[2][i]);
                        values.push(newVal);
                    }
                    val[2] = values;
                }
            }
            // GoTo nested array
            else {
                let row = val[i];
                // For AND OR
                if (!Array.isArray(row)) {
                    // nop
                } else {
                    // recursion loop
                    checkDateFormat(row);
                }
            }
        }
    }

    const onValueChanged = (e) => {
        // 2022/12/26 ADD TATSU
        if (e.value) {
            checkDateFormat(e.value);
        }
        const selectedValue = e.component.option('value');
        if (selectedValue || selectedValue === null) {
            // let getLs = JSON.parse(window.sessionStorage.getItem(`${routeName}_timestamp_filterBuilder`));
            let getLs = JSON.parse(window.sessionStorage.getItem(`filterBuilder`));
            try {
                if (getLs !== null) {
                    getLs.values = selectedValue !== null ? selectedValue : [];
                    dxFilterBuilderLib.storeInLS(getLs, page);
                }
            } catch (e) {
                console.log('Error: storeInLS data from onValueChanged', e.message);
            }
        }
        setFilterValue(selectedValue);
    };

    const onEditorPreparing = (e) => {
        if (e.dataType === 'date') {
            // console.log('\n\nonEditorPreparing', e);
        }
    };

    if (loading) return <Loader />;

    // このif文を入れないとエラー時にうまくキャッチ側にフィールドデータが渡らない
    if (fields && fields.length >= 1) {
        return (
            <FilterErrorBoundary
                fields={fields}
                maxGroupLevel={maxGroupLevel}
                onValueChanged={onValueChanged}
                filterOperationDescriptions={filterOperationDescriptions}
                groupOperations={groupOperations}
            >
                <FilterBuilder
                    value={filterValue}
                    fields={fields}
                    maxGroupLevel={maxGroupLevel}
                    onValueChanged={onValueChanged}
                    filterOperationDescriptions={filterOperationDescriptions}
                    groupOperations={groupOperations}
                    allowHierarchicalFields={true}
                    onEditorPreparing={onEditorPreparing}
                >
                    <CustomOperation
                        name="=date"
                        caption="が等しい（日付）"
                        icon="equal"
                        editorComponent={FilterDateTypeEditorComponent}
                    />
                    <CustomOperation
                        name="<>date"
                        caption="が等しくない（日付）"
                        icon="notequal"
                        editorComponent={FilterDateTypeEditorComponent}
                    />
                    <CustomOperation
                        name="<date"
                        caption="より小さい（日付）"
                        icon="less"
                        editorComponent={FilterDateTypeEditorComponent}
                    />
                    <CustomOperation
                        name=">date"
                        caption="より大きい（日付）"
                        icon="greater"
                        editorComponent={FilterDateTypeEditorComponent}
                    />
                    <CustomOperation
                        name="<=date"
                        caption="以下（日付）"
                        icon="lessorequal"
                        editorComponent={FilterDateTypeEditorComponent}
                    />
                    <CustomOperation
                        name=">=date"
                        caption="以上（日付）"
                        icon="greaterorequal"
                        editorComponent={FilterDateTypeEditorComponent}
                    />
                    <CustomOperation
                        name="samedate"
                        caption="値が同じ（日付）"
                        icon="indeterminatestate"
                        editorComponent={FilterSameEditorComponent}
                        customizeText={customizeTextSame}
                    />
                    <CustomOperation
                        name="notsamedate"
                        caption="値が同じでない（日付）"
                        icon="close"
                        editorComponent={FilterSameEditorComponent}
                        customizeText={customizeTextSame}
                    />
                    {/* <CustomOperation
                        name="betweendate"
                        caption="を含む範囲（日付）"
                        icon="range"
                        editorComponent={FilterDateRangeTypeEditorComponent}
                    /> */}

                    <CustomOperation
                        name="rangefrom"
                        caption="日付範囲始点"
                        icon="undo"
                        editorComponent={FilterRangeEditorComponent}
                        customizeText={customizeTextRange}
                    />
                    <CustomOperation
                        name="rangeto"
                        caption="日付範囲終点"
                        icon="undo"
                        editorComponent={FilterRangeEditorComponent}
                        customizeText={customizeTextRange}
                    />
                    <CustomOperation
                        name="minlength"
                        caption="最小文字数"
                        icon="chevrondoubleleft"
                        editorComponent={FilterMinlengthEditorComponent}
                    />
                    <CustomOperation
                        name="maxlength"
                        caption="最大文字数"
                        icon="chevrondoubleright"
                        editorComponent={FilterMaxlengthEditorComponent}
                    />
                    <CustomOperation
                        name="regex"
                        caption="固定チェック"
                        icon="favorites"
                        editorComponent={FilterRegexEditorComponent}
                        customizeText={customizeTextRegex}
                    />
                    <CustomOperation
                        name="same"
                        caption="値が同じ"
                        icon="indeterminatestate"
                        editorComponent={FilterSameEditorComponent}
                        customizeText={customizeTextSame}
                    />
                    <CustomOperation
                        name="notsame"
                        caption="値が同じでない"
                        icon="close"
                        editorComponent={FilterSameEditorComponent}
                        customizeText={customizeTextSame}
                    />
                    <CustomOperation
                        name="listinclude"
                        caption="選択した値を含む"
                        icon="increaseindent"
                        editorComponent={FilterListEditorComponent}
                        customizeText={customizeTextList}
                    />
                    <CustomOperation
                        name="listnotinclude"
                        caption="選択した値を含まない"
                        icon="decreaseindent"
                        editorComponent={FilterListEditorComponent}
                        customizeText={customizeTextList}
                    />
                    <CustomOperation name="nowgreaterthan" caption="が実行時以上" icon="spinnext" hasValue={false} />
                    <CustomOperation name="nowlessthan" caption="が実行時以下" icon="spinprev" hasValue={false} />
                </FilterBuilder>
            </FilterErrorBoundary>
        );
    }
}
function calculateFilterExpression(filterValue, field) {
    return (
        filterValue &&
        filterValue.length &&
        Array.prototype.concat
            .apply(
                [],
                filterValue.map((value) => [[field.dataField, '=', value], 'or'])
            )
            .slice(0, -1)
    );
}

// 範囲チェック用
function customizeTextRange(text) {
    const customText = nowRangeCategories.filter((row) => {
        if (row.id == text.value) {
            return row;
        }
    });
    return customText[0].name;
}
// 固定チェック用
function customizeTextRegex(text) {
    const customText = regularExpressionCategories.filter((row) => {
        if (row.id == text.value) {
            return row;
        }
    });
    return customText[0].name;
}
// フィールドチェック用
function customizeTextSame(text) {
    const field_parameter = JSON.parse(window.sessionStorage.getItem('field_parameter'));
    const customText = field_parameter.filter((row) => {
        if (row.id == text.value) {
            return row;
        }
    });
    return customText[0]?.name;
}
// リスト用
function customizeTextList(text) {
    const customText = text.field.lookup.dataSource.filter((row) => {
        if (row.value == text.value) {
            return row;
        }
    });
    // 以下の部分のコメントアウトを外すと無効なフィールドがあっても落ちなくなる 
    // haga 20230710
    if (customText[0] !== undefined) {
        return customText[0].name;
    }
    else {
        return null;
    }
    // return customText[0].name;
}
