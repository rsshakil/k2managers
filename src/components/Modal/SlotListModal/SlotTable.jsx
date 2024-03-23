import { useEffect } from 'react';
import { compareError } from '../../../lib/compareError';
import { setToLocalStorage } from '../../../lib/localStrorage';
import { timeToString } from '../../../lib/timeToString';
import { checkReservedSlot } from '../../../utilities/checkReservedSlot';
import TextBox from '../../Form/FormInputs/TextBox';
const SlotTable = ({
    data,
    numOfCols,
    numOfRows,
    editRows,
    setEditRows,
    setAllowBlink,
    values,
    handleChange,
    setErrorDisplayList,
    initialValues,
}) => {
    useEffect(() => {
        document.querySelectorAll('.blink-me').forEach((i) => {
            const anim = i.getAnimations()[0];
            anim.cancel();
            anim.play();
        });
    }, [editRows]);

    const setTableBody = () => {
        var table = [];
        for (let k = 0; k < numOfRows; k++) {
            var row = [];
            for (let i = 0; i < data.items.length; i++) {
                let slot = data.items[i].slots[k];

                if (i === 0) {
                    row.push(
                        <>
                            <td key={i} className="text-right border border-slate-400 pr-2">
                                {slot.slotTime && timeToString(slot.slotTime)}
                            </td>
                        </>
                    );
                }
                row.push(
                    <>
                        <td
                            className={`text-center border border-slate-400 
                                ${
                                    slot.numberOfReservedSlots === 0 && values[slot.slotId] === 0 //if slot number & max number both 0, it's color should be white alpha 50%
                                        ? '!text-white !text-opacity-50'
                                        : ''
                                }
                                ${
                                    values[slot.slotId] === '' //if max value input is empty, reserved slot will be white, else we check the four condition whether it should be red
                                        ? 'text-white'
                                        : checkReservedSlot(slot.numberOfReservedSlots, values[slot.slotId])
                                        ? 'text-orange-300'
                                        : ''
                                } 
                                `}
                            key={data.items[i].itemId + slot.slotId + `a`}
                        >
                            {slot.numberOfReservedSlots}
                        </td>
                        <td
                            className="text-center border border-slate-400"
                            key={data.items[i].itemId + slot.slotId + `b`}
                        >
                            <TextBox
                                min="0"
                                max="999"
                                type="number"
                                className={` 
                                    ${editRows[slot.slotId] ? 'font-bold blink-me' : ''} 
                                    ${
                                        slot.numberOfReservedSlots === 0 && values[slot.slotId] === 0 //if slot number & max number both 0, it's color should be white alpha 50%
                                            ? 'text-white text-opacity-50'
                                            : 'text-white text-opacity-100'
                                    } 
                                    w-full border-none bg-gray-900 text-center focus:outline-blue-50 
                                    `}
                                // name={slot.slotId}
                                name={slot.slotId}
                                // onKeyDown={handleInput}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                value={values[slot.slotId]}
                                onPaste={(e) => e.preventDefault()}
                                onWheel={(e) => e.target.blur()}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    if (values[slot.slotId] === '') {
                                        values[slot.slotId] = 0;
                                        e.target.value = 0;
                                    }

                                    if (+value >= 0 && +value <= 999 && +value !== initialValues[slot.slotId]) {
                                        handleChange(e);
                                        slot.editSlot = true;
                                        setEditRows((prev) => ({
                                            //tracking fields which are edited for blinking
                                            [slot.slotId]: true,
                                            ...prev,
                                        }));
                                        setAllowBlink(true);
                                        //saving all the changes in input values to local storage
                                        setToLocalStorage('slotInputValues', values);

                                        //check the condition for error, if error is true set it as error
                                        if (compareError(slot.numberOfReservedSlots, +value)) {
                                            // r whenever the reserved slot is greater than the max number, we need to throw an error
                                            setErrorDisplayList((prev) => ({
                                                [slot.slotId]: true,
                                                ...prev,
                                            }));
                                        } else {
                                            setErrorDisplayList((prev) => {
                                                const copy = { ...prev };
                                                delete copy[slot.slotId];
                                                return copy;
                                            });
                                        }
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (+value >= 0 && +value <= 999) {
                                        handleChange(e);
                                    }
                                }}
                            />
                        </td>
                    </>
                );
            }
            table.push(<tr key={k}>{row}</tr>);
        }
        return table;
    };

    return (
        <>
            <table className="border-collapse w-full overflow-x-auto table-fixed">
                <thead>
                    <tr className="h-[48px]">
                        <th
                            rowSpan="2"
                            className={`sticky top-0 z-10 border border-b-0  border-slate-400 text-center font-bold text-white`}
                        ></th>
                        {data.items
                            ? data.items.map((item, index) => {
                                  return (
                                      <>
                                          <th
                                              colSpan="2"
                                              key={item.itemId + `_` + index}
                                              className={`border border-b-0  border-slate-400 text-center font-bold text-white`}
                                              data={item.itemId}
                                          >
                                              {item.itemName}
                                          </th>
                                      </>
                                  );
                              })
                            : 'Table Header Label Not Found'}
                    </tr>
                    <tr className="h-[48px]">
                        {[...Array(numOfCols)].map((e, index) => {
                            return (
                                <>
                                    <th
                                        key={index}
                                        className={`border border-b-0  border-slate-400 text-center font-bold text-white`}
                                    >
                                        予約
                                    </th>
                                    <th
                                        className={`border border-b-0  border-slate-400 text-center font-bold text-white`}
                                    >
                                        最大
                                    </th>
                                </>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>{setTableBody()}</tbody>
            </table>
        </>
    );
};
export default SlotTable;
