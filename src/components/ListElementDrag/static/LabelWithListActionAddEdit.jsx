import React from 'react';
import EditIconSVG from '../../SVG/EditIconSVG';

export default function LabelWithListActionAddEdit({ labelTitle, column1Title, column2Title, id, children }) {
    return (
        <>
            <div className="flex flex-col mb-8">
                <div className="mb-4 text-blue-100">
                    <label htmlFor="">{labelTitle ? labelTitle : 'Label Title'}</label>
                </div>
                <div className="pl-10">
                    <div className="mb-1 text-blue-100 flex space-x-8 items-center text-center">
                        <div className="">
                            <p>{column1Title ? column1Title : 'column1 Title'}</p>
                        </div>
                        <div className="">
                            <p>{column2Title ? column2Title : 'column1 Title'}</p>
                        </div>
                    </div>
                    <div id={id ? id : 'settingListId'}>
                        <div className="">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function LabelWithListActionAddEditIcon({ iconComponent, column2Text }) {
    return (
        <>
            <div className="mb-1 flex text-blue-100 hover:bg-cevenhover space-x-8 items-center text-center">
                <div className="px-[5px] flex items-center text-center justify-center cursor-pointer">
                    {iconComponent ? iconComponent : 'icon Component'}
                </div>
                <div className="">
                    <p>{column2Text ? column2Text : 'column2 Text'}</p>
                </div>
            </div>
        </>
    );
}
