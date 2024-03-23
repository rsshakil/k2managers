import Button from 'devextreme-react/button';
import React from 'react';

const IconComponent = ({ data, handleAddIcon, handleCalendar }) => {
    const subjectElementDiv = document.getElementsByClassName('dx-treelist-cell-expandable');
    const elementArray = Array.prototype.slice.call(subjectElementDiv);
    elementArray.forEach(function (element) {
        element.addEventListener('mouseover', (e) => {
            if (e.target?.firstChild?.offsetWidth < e.target?.firstChild?.scrollWidth) {
                return e.target?.setAttribute('data-tooltip', e.target?.innerText);
            } else {
                return e.target?.removeAttribute('data-tooltip');
            }
        });
    });

    return (
        <>
            <div className="flex justify-between dxc-tooltip" aria-colindex="1">
                <div className="text-blue-100 truncate pointer-events-none">{data.text}</div>
                {data.data.type && data.data.type === 'event' ? (
                    <Button hint="Add Shift" icon="plus" onClick={handleAddIcon} />
                ) : data.data.type === 'institute' ? (
                    <Button hint="Calendar Shift" icon="event" onClick={handleCalendar} />
                ) : null}
            </div>
        </>
    );
};

export default IconComponent;
