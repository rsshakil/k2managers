import React, { useState } from 'react';
import DragApp from '../../../ListElementDrag/DragApp';
import InputContainer from '../../../Wrapper/InputContainer';
import TextBox from '../../../Form/FormInputs/TextBox';
const blockData = [];

export default function CustomerSettingTemplateEdit({ customerAddTemplateData, buttonTypeData, fieldInfoList }) {

    const [buttonType, setButtonType] = useState(
        buttonTypeData
            ? { ...buttonTypeData }
            : {
                  buttonName: 'フィールド追加',
                  type: 'F', //// フィールド追加
                  buttonData: blockData ? blockData : [],
                  buttonItems: [],
                  placeholder: 'フィールド追加',
              }
    );
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
                    label="顧客編集テンプレート名"
                    labelClassName="text-blue-100"
                    inputClassName="bg-blue-25"
                    type="text"
                    name="customerEditTemplateName"
                    placeholder="顧客編集テンプレート名"
                    isRequired
                />
            </InputContainer>
        }
        {
            <DragApp
                title="顧客編集時に表示するフィールド設定"
                dragList={customerAddTemplateData? customerAddTemplateData : []}
                buttonType={{ ...buttonTypeData }}
                buttonTitle={buttonType.buttonName}
                controlDragDrop={controlDragDrop}
                addLimit={500}
                load={true}
            />
        }
        </>
        
    );
}
