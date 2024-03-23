import React from 'react';
import { SelectBox } from 'devextreme-react';

export default function ButtonTypeE({ buttonData, addFromEType }) {
    return (
        <>
            <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                <div className="dx-field-value">
                    <SelectBox
                        items={buttonData}
                        placeholder="Select Option"
                        onItemClick={(e) => {
                            addFromEType(e);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
