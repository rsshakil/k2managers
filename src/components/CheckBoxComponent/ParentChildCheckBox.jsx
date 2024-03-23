import React from 'react';
import Checkbox from '../Form/FormInputs/CheckboxInput';

const ParentChildCheckBox = ({ label, Data, label2 }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-blue-100" htmlFor={label}>
                {label}
            </label>
            {Data.map((parentChildItem, index) => (
                <div key={parentChildItem.name[0]} className="ml-10 text-blue-100 font-normal mb-[2rem]">
                    <label htmlFor={parentChildItem.label[0] + index}>
                        {parentChildItem.label[0]}
                        {parentChildItem.label[1] && <span className="font-normal">{parentChildItem.label[1]}</span>}
                    </label>
                    <div className="ml-[2rem]">
                        <Checkbox
                            name={parentChildItem.name[0]}
                            id={parentChildItem.label[0] + index}
                            children={parentChildItem.parentLabel}
                        />
                        {parentChildItem.childLabel && (
                            <div className="ml-[98px]">
                                <Checkbox name={parentChildItem?.name[1]} children={parentChildItem.childLabel} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ParentChildCheckBox;
