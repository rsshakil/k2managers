import React from 'react';

export default function ErrorText({
    errorType = '',
    requiredErrorText = '',
    patternErrorText = '',
    typeErrorText = '',
    minErrorText = '',
    maxErrorText = '',
    stepErrorText = '',
    unauthorizeErrorText = '',
    networkErrorText = '',
    customErrorText = '',
    dataId = '',
    classes = '',
    styles = {},
}) {
    let errorText = '';
    switch (errorType) {
        case 'required':
            errorText = requiredErrorText;
            break;
        case 'pattern':
            errorText = patternErrorText;
            break;
        case 'type':
            errorText = typeErrorText;
            break;
        case 'min':
            errorText = minErrorText;
            break;
        case 'max':
            errorText = maxErrorText;
            break;
        case 'step':
            errorText = stepErrorText;
            break;
        case 'unauthorize':
            errorText = unauthorizeErrorText;
            break;
        case 'network':
            errorText = networkErrorText;
            break;
        case 'custom':
            errorText = customErrorText;
            break;
    }

    return (
        <>
            {errorText && (
                <p data-id={dataId} className={`break-all ${classes}`} style={styles}>
                    {errorText}
                </p>
            )}
        </>
    );
}
