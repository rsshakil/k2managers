import React, { useId } from "react";
import { Field } from "formik";
const FieldWithLabel = ({ label, labelClassName,inputClassName, children, ...props }) => {
    const id = useId(); 
    return (
        <>
            <label htmlFor={id} className={labelClassName}>{label}</label>
            {children ? (
                <Field {...props} id={id} className={`h-8 p-2 outline-none border border-solid border-blue-100 width-full ${inputClassName}`}> children </Field>
            ) : (
                <Field as={`${props.type}`}  id={id} className={`h-8 p-2 outline-none border border-solid border-blue-100 width-full ${inputClassName}`} {...props} />
            )}
        </>
    );
};

export default FieldWithLabel;
