import React, { createRef, useEffect } from 'react';
import Button from '../Button/Button';
import Loading from '../Loading/Loader';
import Modal from '../Modal/components/Modal';
import DialogWrapper from '../Wrapper/DialogWrapper';
import ModalTitle from './components/ModalTitle';

const ModalScrollable = (props) => {
    const {
        title,
        children,
        leftBtnTitle,
        handleButtonLeft,
        handleButtonRight,
        deleteLoading,
        rightBtnTitle,
        errors,
        values,
    } = props;
    const focusRef = createRef();

    const handleConfirmSubmit = () => {
        values ? handleButtonLeft(values) : handleButtonLeft();
    };

    return (
        <DialogWrapper
            width="border-none !text-white overscroll-auto overflow-y-scroll h-[100vh]"
            className="items-start"
        >
            {/*this is the modal title section*/}
            <ModalTitle title={title} />
            {/*modal body section*/}
            <div className="p-2 min-h-[43rem]">
                {children}
                {deleteLoading && <Loading />}
            </div>
            {/* this is modal footer section*/}
            <Modal.Footer error={errors}>
                <Button
                    title={leftBtnTitle}
                    onClick={handleConfirmSubmit}
                    id="deleteModalStartButton"
                    ref={focusRef}
                    type="button"
                />
                <Button title={rightBtnTitle} id="deleteModalEndButton" onClick={handleButtonRight} />
            </Modal.Footer>
        </DialogWrapper>
    );
};
export default ModalScrollable;
