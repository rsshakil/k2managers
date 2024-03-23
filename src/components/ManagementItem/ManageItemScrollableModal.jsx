import React, { createRef, useEffect } from 'react';
import Button from '../Button/Button';
import Loading from '../Loading/Loader';
// import Modal from '../Modal/components/Modal'
import DialogWrapper from '../Wrapper/DialogWrapper';
// import ModalTitle from "./components/ModalTitle";

const ManageItemScrollableModal = (props) => {
    const { children, deleteLoading } = props;

    return (
        <DialogWrapper
            width="border-none !text-white overscroll-auto overflow-y-scroll h-[100vh]"
            className="items-start"
        >
            <div className="p-2 min-h-[43rem]">
                {children}
                {deleteLoading && <Loading />}
            </div>
        </DialogWrapper>
    );
};
export default ManageItemScrollableModal;
