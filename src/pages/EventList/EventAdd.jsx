import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import EventForm from '../../components/Form/EventForm';
import { ItemData } from '../../utilities/projectBtnItemData';

const initialValues = {
    eventImageURL1: '',
    eventImageURL2: '',
    eventImageURL3: '',
    eventName: '',
    eventOverview: '',
    eventDescription: '',
    eventStartDate: '',
    eventEndDate: '',
    eventStartTime: '',
    eventEndTime: '',
    eventYearStartDate: '',
    eventYearEndDate: '',
    eventFiscalStartDate: '',
    eventFiscalEndDate: '',
    eventCustomerDeleteFlag: 0,
    eventCustomerDeleteValue: '',
    eventMailFlag: 0,
    eventReminderSendFlag: 0,
    eventReminderSendValue: '',
    token1FieldId: '',
    token2FieldId: '',
    token3FieldId: '',
    memo: '',
};

const EventAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="イベント > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <EventForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default EventAdd;
