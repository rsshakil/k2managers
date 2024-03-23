import { useState } from 'react';
import EmployeeList from './EmployeeList';
import TagBoxComponent from './TagBoxComponent';

import { FaTrash } from 'react-icons/fa';
import ButtonTypeF from '../ListElementDrag/ButtonType/ButtonTypeF';
import ExpandRow from './ExpandRows/ExpandRow';

const selectableNamesF = [
    { id: 1, text: 'AA', disabled: false },
    { id: 2, text: 'BB', disabled: true },
    { id: 3, text: 'CC', disabled: false },
    { id: 4, text: 'DD', disabled: false },
    { id: 5, text: 'EE', disabled: false },
    { id: 6, text: 'FF', visible: false },
    { id: 7, text: 'SuperPlasma 500', visible: false },
    { id: 8, text: 'SuperPlasma 500', visible: false },
];

const ManagementItem = () => {
    const [dragList, setDragList] = useState([]);

    const [buttonType, setButtonType] = useState({
        buttonName: 'Button Type F',
        type: 'F',
        buttonData: selectableNamesF ? selectableNamesF : [],
    });
    const [optionValue, setOptionValue] = useState('');

    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1', header: '' },
        dragable: { show: false, space: 'col-span-1', header: '' }, //col-span-2
        pen: { show: false, space: 'col-span-1', header: '' },
        checkbox1: { show: false, space: 'col-span-1', header: '' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-2', header: '' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: false, space: 'col-span-2', header: '' },
        inputBox2: { show: true, space: 'col-span-10', placeholder: 'Input Box 2', header: '' },
        trash: { show: true, space: 'col-span-1', header: '' },
    });

    // Tag box handle state
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });
    const [countTagBox, setCountTagBox] = useState([{ name: 'TagBox1', ID: 1 }]);

    // Add more tag box handle
    const addMoreTagBox = () => {
        if (countTagBox.length == 0) {
            setCountTagBox([{ name: 'TagBox1', ID: 1 }]);
        } else {
            setCountTagBox([
                ...countTagBox,
                { name: 'TagBox', ID: Math.floor(Math.random() * (1000 - 100 + 1) + 100) },
            ]);
        }
    };
    // delete tagBox Hangle
    const deleteTagBox = (e) => {
        if (countTagBox.length > 0) {
            const filterCountTagBox = countTagBox.filter((ctb) => ctb.ID !== e);
            setCountTagBox([...filterCountTagBox]);
            localStorage.removeItem(`TagBox${e}`);
        }
    };

    // Add form type FFFFFFFFF
    const addFromFType = (e) => {
        const selectedItem = e.itemData;
        const selectedItemId = e.itemData.id;
        const selectedItemValue = e.itemData.text;

        let stateButtonData = [...buttonType.buttonData];

        stateButtonData.forEach((item, index, arr) => {
            if (item.id == selectedItemId) {
                item.disabled = true;
            }
        });

        const newButtonData = { ...buttonType, buttonData: stateButtonData };
        setButtonType({ ...newButtonData });

        // Add Form data in array
        const itemValue = e.itemData.text;
        let stateArray = [...dragList];
        let randomID = Math.floor(Math.random() * (10000 - 100 + 1) + 100);

        const fromObj = {
            Name: itemValue,
            Title: itemValue,
            id: randomID,
            name: itemValue + 'Can Perent and Child',
            isDirectory: true, //isDirectory
            expanded: true,
            icon: 'home',
            items: [],
            ID: randomID,
        };

        stateArray.push(fromObj);

        setDragList && setDragList([...dragList, fromObj]);
    };

    return (
        <div>
            {dragList.length > 0 && dragList.map((dL) => <ExpandRow />)}

            <ButtonTypeF buttonData={buttonType.buttonData} optionValue={optionValue} addFromFType={addFromFType} />

            <p>Tagbox count</p>
            {countTagBox.length > 0 &&
                countTagBox.map((ctb, i) => (
                    <div className="w-12/12 flex border">
                        <div className="w-10/12">
                            <p>TagBox - {ctb.ID}</p>
                            <TagBoxComponent key={i} count={ctb.ID} dragList={dragList} functionMode={functionMode} />
                        </div>
                        <div className="w-2/12 mt-1">
                            <p>Delete</p>
                            <button
                                onClick={() => deleteTagBox(ctb.ID)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            <button
                onClick={addMoreTagBox}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add More
            </button>

            <EmployeeList dragList={dragList} functionMode={functionMode} />
        </div>
    );
};

export default ManagementItem;
