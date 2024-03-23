import React from 'react';

const Column = ({ app }) => {
    return (
        <tr className="h-8 table-row-bg row-display text-left">
            <td className="min-w-[20rem] right-border pl-2 ellipsis max-w-[0]">{app?.appName}</td>
            <td className="min-w-[10rem] right-border pl-2 ellipsis max-w-[0]">{app.domain}</td>
            <td className="w-[28.75rem] right-border text-left pl-3">{app?.eventName}</td>

            <td className="w-[8rem] right-border pl-2 text-right">
                <span className="pr-2">{app?.accessCount}</span>
            </td>
        </tr>
    );
};

export default Column;
