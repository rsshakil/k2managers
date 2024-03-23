import React from 'react';
import './Tooltip.css';

const Tooltip = ({ title, className = '' }) => {
    return (
        <div className={`tooltiptext ${className}`} style={{ left: '70px', lineHeight: '24px' }}>
            {title}
        </div>
    );
};
export default Tooltip;
