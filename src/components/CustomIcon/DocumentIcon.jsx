import React from 'react';
import { GrDocumentText } from 'react-icons/gr';

const DocumentIcon = ({className}) => {
    return (
        <GrDocumentText className={`inline-block grIconColor ${className}`} />
    );
};

export default DocumentIcon;