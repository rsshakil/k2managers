import { Formik } from 'formik';
import React, { useState } from 'react';
import { tasks } from './data';
import { tasks1 } from './dataExpandable';
import DragApp from './DragApp';

const selectableNamesE = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const selectableNamesF = [
    { id: 1, text: 'AA', disabled: false },
    { id: 2, text: 'BB', disabled: false },
    { id: 3, text: 'CC', disabled: false },
    { id: 4, text: 'DD', disabled: false },
    { id: 5, text: 'EE', disabled: false },
    { id: 6, text: 'FF', visible: false },
    { id: 7, text: 'SuperPlasma 500', visible: false },
    { id: 8, text: 'SuperPlasma 500', visible: false },
];

export default function DragAppType() {
    // Model Style of Drag App is A
    const [dragList, setDragList] = useState([...tasks]);
    const [buttonType, setButtonType] = useState({ buttonName: 'リスト追加', type: 'A' });
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
        pen: { show: true, space: 'col-span-1', header: '編集' },
        checkbox1: { show: true, space: 'col-span-1', header: '必須 （管理画面からの操作時のみ）' },
        info: { show: true, space: 'col-span-2', header: 'info' },
        info2: { show: false, space: 'col-span-2', header: 'info2' },
        task: { show: true, space: 'col-span-1', header: '' },
        checkbox2: { show: true, space: 'col-span-1', header: '初期値 ' },
        inputBox: { show: true, space: 'col-span-2', header: 'タスク' },
        inputBox2: { show: true, space: 'col-span-3', header: '' },
        inputBox3: { show: false, space: 'col-span-3', header: '' },
        trash: { show: true, space: 'col-span-1', header: '削除 ' },
    });

    // Model Style of Drag App is B

    const [dragList1, setDragList1] = useState([...tasks1]);
    const [buttonType1, setButtonType1] = useState({ buttonName: 'リスト追加', type: 'B' });
    const [controlDragDrop1, setDragDrop1] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
        pen: { show: true, space: 'col-span-1', header: '編集' },
        checkbox1: { show: true, space: 'col-span-1', header: '必須 （管理画面からの操作時のみ）' },
        info: { show: true, space: 'col-span-2', header: 'info' },
        info2: { show: false, space: 'col-span-2', header: 'info2' },
        task: { show: true, space: 'col-span-1', header: '' },
        checkbox2: { show: true, space: 'col-span-1', header: '初期値 ' },
        inputBox: { show: true, space: 'col-span-2', header: 'タスク' },
        inputBox2: { show: true, space: 'col-span-3', header: '' },
        inputBox3: { show: false, space: 'col-span-3', header: '' },
        trash: { show: true, space: 'col-span-1', header: '削除 ' },
    });

    // Model Style of Drag App is D

    const [dragListC, setDragListC] = useState([...tasks1]);
    const [buttonTypeC, setButtonTypeC] = useState({ buttonName: 'リスト追加', type: 'D' });
    const [controlDragDropC, setDragDropC] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: false, space: 'col-span-1', header: '' }, //col-span-2
        pen: { show: false, space: 'col-span-1', header: '' },
        checkbox1: { show: false, space: 'col-span-1', header: '' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-2', header: '' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: false, space: 'col-span-2', header: '' },
        inputBox2: { show: false, space: 'col-span-10', header: '' },
        inputBox3: { show: true, space: 'col-span-10', header: '' },
        trash: { show: true, space: 'col-span-1', header: '' },
    });

    // Model Style of Drag App is E
    const [dragListE, setDragListE] = useState([]);
    const [buttonTypeE, setButtonTypeE] = useState({
        buttonName: 'Button Type E',
        type: 'E',
        buttonData: selectableNamesE ? selectableNamesE : [],
    });

    const [controlDragDropE, setDragDropE] = useState({
        grid: { name: 'grid grid-cols-12 gap-1', header: '' },
        dragable: { show: true, space: 'col-span-1', header: '' }, //col-span-2
        pen: { show: true, space: 'col-span-1', header: '' },
        checkbox1: { true: false, space: 'col-span-1', header: '' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-2', header: '' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: false, space: 'col-span-2', header: '' },
        inputBox2: { show: true, space: 'col-span-8', placeholder: 'Input Box 2', header: '' },
        inputBox3: { show: false, space: 'col-span-3', header: '' },
        trash: { show: true, space: 'col-span-1', header: '' },
    });
    // Model Style of Drag App is F
    const [dragListF, setDragListF] = useState([]);
    const [buttonTypeF, setButtonTypeF] = useState({
        buttonName: 'Button Type F',
        type: 'F',
        buttonData: selectableNamesF ? selectableNamesF : [],
    });

    const [controlDragDropF, setDragDropF] = useState({
        grid: { name: 'grid grid-cols-12 gap-1', header: '' },
        dragable: { show: true, space: 'col-span-1', header: '' }, //col-span-2
        pen: { show: true, space: 'col-span-1', header: '' },
        checkbox1: { true: false, space: 'col-span-1', header: '' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-2', header: '' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: true, space: 'col-span-8', header: '' },
        inputBox2: { show: false, space: 'col-span-8', placeholder: 'Input Box 2', header: '' },
        inputBox3: { show: false, space: 'col-span-3', header: '' },
        trash: { show: true, space: 'col-span-1', header: '' },
    });

    return (
        <>
            <h1>Button Type A</h1>
            <DragApp dragList={dragList} buttonType={buttonType} controlDragDrop={controlDragDrop} addLimit={32} />
            <br />
            <h1>Button Type B</h1>
            <Formik>
                <DragApp
                    dragList={dragList1}
                    buttonType={buttonType1}
                    controlDragDrop={controlDragDrop1}
                    addLimit={32}
                />
            </Formik>
            <br />
            <h1>Button Type E You can select multiple items</h1>
            <DragApp
                dragList={dragListE}
                setDragList={setDragListE}
                buttonType={buttonTypeE}
                controlDragDrop={controlDragDropE}
                addLimit={32}
            />
            <h1>Button Type F You can select One items</h1>
            <DragApp
                dragList={dragListF}
                setDragList={setDragListE}
                buttonType={buttonTypeF}
                controlDragDrop={controlDragDropF}
                addLimit={32}
            />
            <br />
            <h1>Button Type InstituteTime</h1>
            <DragApp dragList={dragListC} buttonType={buttonTypeC} controlDragDrop={controlDragDropC} addLimit={32} />
            <br />
        </>
    );
}
