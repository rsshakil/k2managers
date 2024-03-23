import React, { createRef } from 'react';
import Button from '../Button/Button';
import Loading from '../Loading/Loader';
import Modal from '../Modal/components/Modal';
import ModalTitle from '../Modal/components/ModalTitle';
import DialogWrapper from '../Wrapper/DialogWrapper';

const DialogModal = (props) => {
    const {
        title,
        colorType,
        children,
        btn_title,
        handleButtonLeft,
        handleButtonRight,
        deleteLoading,
        cancel_title,
        errors,
        values,
        numberOfButton = 2,
    } = props;
    const focusRef = createRef();

    const handleConfirmSubmit = () => {
        values ? handleButtonLeft(values) : handleButtonLeft();
    };

    return (
        <DialogWrapper>
            {/*this is the modal title section*/}
            <ModalTitle title={title} />
            {/*modal body section*/}
            <Modal.Body>
                {children}
                {deleteLoading && <Loading />}
            </Modal.Body>
            {/* this is modal footer section*/}
            <Modal.Footer error={errors} numButton={numberOfButton}>
                <Button
                    className={`${colorType !== undefined ? colorType : 'bg-orange-300 hover:bg-orange-400'}`}
                    title={btn_title}
                    onClick={handleConfirmSubmit}
                    id="deleteModalStartButton"
                    ref={focusRef}
                    type="button"
                />
                {numberOfButton == 2 && (
                    <Button title={cancel_title} id="deleteModalEndButton" onClick={handleButtonRight} />
                )}
            </Modal.Footer>
        </DialogWrapper>
    );
};
export default DialogModal;
