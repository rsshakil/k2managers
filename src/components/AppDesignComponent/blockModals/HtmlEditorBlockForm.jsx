import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import HtmlEditor, {
    ImageUpload,
    Item,
    MediaResizing,
    TableContextMenu,
    TableResizing,
    Toolbar,
} from 'devextreme-react/html-editor';
import { useRef } from 'react';
import Note from '../../Form/FormInputs/Note';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

const sizeValues = ['10px', '14px', '16px', '18px', '22px', '24px', '28px', '32px', '36px'];
const fontValues = [
    'Arial',
    'Courier New',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Times New Roman',
    'Verdana',
];
const headerValues = [false, 1, 2, 3, 4, 5];
const tabs = [
    { name: 'From This Device', value: ['file'] },
    { name: 'From the Web', value: ['url'] },
    { name: 'Both', value: ['file', 'url'] },
];

export default function HtmlEditorBlockForm({ blockData = '', setModalOpen = () => {}, handleOnPressSave = () => {} }) {
    const [formData, setFormData] = useState(blockData);

    const [isMultiline, setIsMultiline] = useState(true);
    const [currentTab, setCurrentTab] = useState(tabs[2].value);

    const ref = useRef(null);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnchangeEditor(e) {
        const value = e.value;

        let html = '';
        if (ref.current) {
            html = ref.current._element.children[1].innerHTML;
            html = html.replace(/contenteditable="true"/g, '').replace(/class/g, 'className');
        }

        setFormData((prevState) => ({
            ...prevState,
            htmlSorce: html,
            markupSource: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="WYSIWIG設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <Note
                                        label="ブロックカスタムClass"
                                        name="blockWrapCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <HtmlEditor
                                        height="750px"
                                        className="hover:outline-1 active:outline-1 focus:outline-1 hover:outline-offset-0 active:outline-offset-0 focus:outline-offset-0 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] outline-none border border-solid border-blue-100 width-full !rounded-none"
                                        defaultValue={formData.markupSource}
                                        onValueChanged={handleOnchangeEditor}
                                        ref={ref}
                                    >
                                        <TableContextMenu enabled={true} />
                                        <TableResizing enabled={false} />
                                        <MediaResizing enabled={false} />
                                        <ImageUpload tabs={currentTab} fileUploadMode="base64" />
                                        <Toolbar multiline={isMultiline}>
                                            <Item name="undo" />
                                            <Item name="redo" />
                                            <Item name="separator" />
                                            <Item name="size" acceptedValues={sizeValues} />
                                            <Item name="font" acceptedValues={fontValues} />
                                            <Item name="separator" />
                                            <Item name="bold" />
                                            <Item name="italic" />
                                            <Item name="strike" />
                                            <Item name="underline" />
                                            <Item name="separator" />
                                            <Item name="alignLeft" />
                                            <Item name="alignCenter" />
                                            <Item name="alignRight" />
                                            <Item name="alignJustify" />
                                            <Item name="separator" />
                                            <Item name="orderedList" />
                                            <Item name="bulletList" />
                                            <Item name="separator" />
                                            <Item name="header" acceptedValues={headerValues} />
                                            <Item name="separator" />
                                            <Item name="color" />
                                            <Item name="background" />
                                            <Item name="separator" />
                                            <Item name="link" />
                                            <Item name="image" />
                                            <Item name="separator" />
                                            <Item name="clear" />
                                            <Item name="codeBlock" />
                                            <Item name="blockquote" />
                                            <Item name="separator" />
                                            <Item name="insertTable" />
                                            <Item name="deleteTable" />
                                            <Item name="insertRowAbove" />
                                            <Item name="insertRowBelow" />
                                            <Item name="deleteRow" />
                                            <Item name="insertColumnLeft" />
                                            <Item name="insertColumnRight" />
                                            <Item name="deleteColumn" />
                                        </Toolbar>
                                    </HtmlEditor>
                                </InputContainer>
                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
