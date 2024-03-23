import React from 'react';
import Label from '../../../Form/FormInputs/Label';
import UseTable from '../../../Table/UseTable';
import TableRow from './TableRow';

const headerCells = [
    { label: '列', width: '24.325rem' },
    { label: '置換タグ', minWidth: '37.5rem' },
    { label: 'コピー', width: '4.625rem' },
];
export default function ReplacementTagList({ replacementTagRecords }) {
    const { TblContainer, TblHead } = UseTable(headerCells);

    return (
        <>
            <Label name="replacementTagLabel" labelClassName="text-blue-100" label="置換タグ一覧" />
            <div className="table-wrapper">
                <TblContainer>
                    <TblHead />
                    <tbody className="tbody-vertical-scroll !h-auto">
                        {replacementTagRecords?.map((listRecord) => (
                            <TableRow listRecord={listRecord} key={listRecord.id} />
                        ))}
                    </tbody>
                </TblContainer>
            </div>
        </>
    );
}
