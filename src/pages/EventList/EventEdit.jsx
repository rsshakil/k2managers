import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import EventForm from '../../components/Form/EventForm';
import useGetEvent from '../../hooks/useGetEvent';
import { ItemData } from '../../utilities/projectBtnItemData';
import Loader from '../../components/Loading/Loader'

const EventEdit = () => {
    const { eventId } = useParams();
    const { event, eventLoading, eventError } = useGetEvent(eventId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            {eventLoading ? (
                <Loader />
            ) : (
                <>
                    <BreadCrumbs
                        title={`イベント > 編集 : ${event?.eventName ? event?.eventName : ''}`}
                        className="mt-4 text-blue-50 font-bold px-4"
                    />

                    <EventForm
                        initialValues={{ ...event }}
                        load={eventLoading}
                        error={eventError}
                        formType="edit"
                        editForm={true}
                        setIsOverFlow={setIsOverFlow}
                    />
                </>
            )}
        </div>
    );
};
export default EventEdit;
