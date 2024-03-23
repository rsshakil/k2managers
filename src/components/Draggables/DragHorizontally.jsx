import React from 'react';
import Draggable from "react-draggable"
const DragHorizontally = ({children}) => {
    return (
        <Draggable axis='x'>
                {children}  
        </Draggable>  
    );
};

export default DragHorizontally;