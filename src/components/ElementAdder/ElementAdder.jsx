import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ElemRow from './ElemRow';

const ElementAdder = () => {
    const [list] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    return (
        <div className="bg-gray-50 min-h-screen max-w-[1300px] m-auto my-10">
            <div className="bg-white p-4 rounded-md">
                <h2 className="my-5 text-xl font-bold text-gray-700">ELEMENT ADDITION</h2>
                <div>
                    <div className="flex justify-between bg-gradient-to-tr from-green-300 to-green-600 rounded-md py-2 px-4 text-white font-bold text-md">
                        <div>Drug</div>
                        <div>Edit</div>
                        <div>Doing</div>
                        <div>Title</div>
                        <div>Completed</div>
                        <div>Delete</div>
                    </div>

                    <DragDropContext>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {list.map((item, index) => (
                                        <Draggable key={item} draggableId={item} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <ElemRow key={index} index={index} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default ElementAdder;
