import React, { useState } from 'react';

export function UseForm(initializeValue) {
    const [values, setValues] = useState(initializeValue);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const resetForm = () => {
        setValues(initializeValue);
    };
    return {
        values,
        setValues,
        resetForm,
        handleInputChange,
    };
}

export function Form(props) {
    const { children, ...others } = props;
    return <form {...others}>{children}</form>;
}
