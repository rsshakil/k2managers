import React from 'react';
import { UnixTsToString } from '../../lib/unixTsToString';
import { BsFillPencilFill } from 'react-icons/bs';

export default function BroadcastListTD({
    listRecord,
    setFormType,
    setBroadcastId,
    handleEditBroadcastUser,
    handleEditBroadcastTemplate
}) {
    // FUNCTION START
    function broadcastStatus(text) {
        // cancel // sent // unSent
        return text === 2 ? 'text-orange-300' : text === 1 ? 'text-gray-300' : '';
    }
    function broadcastIsSent(text) {
        // sent // unSent
        return text === 1 ? 'text-gray-300' : '';
    }
    // FUNCTION END
    return (
        <>
            <td className={`w-[8rem] px-2 right-border text-center ${broadcastStatus(listRecord?.broadcastStatus)}`}>
                {listRecord?.broadcastStatus === 0 ? '未送信' : listRecord?.broadcastStatus === 1 ? '送信済' : listRecord?.broadcastStatus === 2 ? '取り消' : listRecord?.broadcastStatus === 3 ? '送信中': ''}
            </td>
            <td className={`w-[8rem] px-2 right-border text-center ${broadcastIsSent(listRecord?.broadcastStatus)}`}>
                {listRecord?.broadcastType === 0 ? 'メール' : 'SMS'}
            </td>
            <td className={`min-w-[10rem] px-2 right-border ellipsis max-w-0 ${broadcastIsSent(listRecord?.broadcastStatus)}`}>
                {listRecord?.broadcastTemplateTitle}
            </td>
            <td className={`w-[11.25rem] px-2 right-border text-center ${broadcastIsSent(listRecord?.broadcastStatus)}`}>
                {listRecord?.broadcastScheduleDatetime && UnixTsToString(listRecord?.broadcastScheduleDatetime)}
            </td>
            <td className={`w-[11.25rem] px-2 right-border text-center ${broadcastIsSent(listRecord?.broadcastStatus)}`}>
                {listRecord?.broadcastEditDatetime && UnixTsToString(listRecord?.broadcastEditDatetime)}
            </td>
            <td className={`w-[11.25rem] px-2 right-border text-center ${broadcastIsSent(listRecord?.broadcastStatus)}`}>
                {listRecord?.broadcastCancelDatetime && UnixTsToString(listRecord?.broadcastCancelDatetime)}
            </td>
            <td
                onClick={() => {
                    setFormType('edit');
                    handleEditBroadcastUser(listRecord);
                    setBroadcastId(listRecord.broadcastId);
                }}
                className={`w-[6rem] px-2 right-border pr-2 ellipsis max-w-[7rem] text-center cursor-pointer`}
            >
                {listRecord?.broadcastCount}
            </td>
            <td
                className={`w-[3rem] px-2 cursor-pointer`}
                onClick={() => handleEditBroadcastTemplate(listRecord)}
            >
                <BsFillPencilFill className={`text-blue-100 m-auto`} />
            </td>
        </>
    );
}