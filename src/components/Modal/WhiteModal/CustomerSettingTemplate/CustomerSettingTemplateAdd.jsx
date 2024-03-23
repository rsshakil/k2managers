import React, { useState } from 'react';
import DragApp from '../../../ListElementDrag/DragApp';
import InputContainer from '../../../Wrapper/InputContainer';
import TextBox from '../../../Form/FormInputs/TextBox';

export default function CustomerSettingTemplateAdd({ customerAddTemplateData, buttonTypeData, fieldInfoList }) {
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
        pen: { show: false, space: 'col-span-1', header: 'abc2' },
        checkbox1: { show: true, space: '!col-span-1', header: '必須' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-6', header: '停留所住所' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: true, space: 'col-span-9', header: 'フィールド名', editable: false },
        inputBox2: { show: false, space: 'col-span-10', header: 'abc5' },
        inputBox3: { show: false, space: 'col-span-3', header: '' },
        trash: { show: true, space: 'col-span-1', header: '削除' },
    });

    return (
        <>
            {
                <InputContainer>
                    <TextBox
                        label="顧客作成テンプレート名"
                        labelClassName="text-blue-100"
                        inputClassName="bg-blue-25"
                        type="text"
                        name="customerEditTemplateName"
                        placeholder="顧客作成テンプレート名"
                        isRequired
                    />
                </InputContainer>
            }
            {
                // dragList.length > 0 &&
                <DragApp
                    title="顧客作成時に表示するフィールド設定"
                    dragList={customerAddTemplateData? customerAddTemplateData : [] }
                    buttonType={{ ...buttonTypeData }}
                    buttonTitle={'フィールド追加'}
                    controlDragDrop={controlDragDrop}
                    addLimit={500}
                    load={true}
                />
            }
        </>
    );
}
