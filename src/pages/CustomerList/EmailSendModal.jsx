import React from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/components/Modal';
import ModalTitle from '../../components/Modal/components/ModalTitle';

const EmailSendModal = ({ closeModal }) => {
    return (
        <>
            <div className="overlay modal-overlay text-white">
                <div className="content-m min-h-full">
                    <div className="content-1440 flex-container">
                        <ModalTitle title="リマインドメール再送" />
                        <Modal.Body>
                            <div className="text-left mt-[1rem]">
                                <p>リマインドメールを再送します。</p>
                                <div className="mt-[1rem]">メール送信完了まで最大で5分程度かかる場合があります</div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button title="いいえ" />
                            <Button title="はい" onClick={() => closeModal(false)} />
                        </Modal.Footer>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EmailSendModal;
