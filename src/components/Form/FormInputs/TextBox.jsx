import { useField } from 'formik';
import React, { forwardRef } from 'react';
import commonConstants from '../../../lib/commonConstants';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';

const TextBox = forwardRef(
    ({ label, labelClassName, inputClassName, valueunset, placeholder, isRequired, ...props }, ref) => {
        const [field] = useField(props);
        return (
            <>
                {label && (
                    <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                        {label} {isRequired ? <AddRequiredMark /> : null}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`h-8 p-2 hover:outline-1 active:outline-2 focus:outline-2 hover:outline-offset-0 active:outline-offset-2 focus:outline-offset-2 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] focus:transition-all focus:duration-200 focus:ease-in outline-none border border-solid border-blue-100 w-full placeholder-gray-300 ${inputClassName}`}
                    placeholder={placeholder ? commonConstants.INPUT_PLACEHOLDER_PREFIX(placeholder) : ''}
                    {...field}
                    {...props}
                />
            </>
        );
    }
);

export default TextBox;
