import Dialog from '@material-ui/core/Dialog';
import React, { cloneElement, createContext, useContext, useState } from 'react';
import Button from '../../Button/Button';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';

const callAll =
    (...fns) =>
    (...args) =>
        fns.forEach((fn) => fn && fn(...args));

const ModalContext = createContext();

function SimpleModal(props) {
    const [isOpen, setIsOpen] = useState(false);

    return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
    const [, setIsOpen] = useContext(ModalContext);

    return cloneElement(child, {
        onClick: callAll(() => setIsOpen(false), child.props.onClick),
    });
}

function ModalOpenButton({ children: child }) {
    const [, setIsOpen] = useContext(ModalContext);

    return cloneElement(child, {
        onClick: callAll(() => setIsOpen(true), child.props.onClick),
    });
}

function ModalContentsBase(props) {
    const [isOpen, setIsOpen] = useContext(ModalContext);
    return (
        <Dialog open={isOpen} onCloase={() => setIsOpen(false)} {...props}>
            {props.children}
        </Dialog>
    );
}

function ModalContents({ title, children, ...props }) {
    return (
        <ModalContentsBase {...props}>
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title={title} className="text-blue-100" />
                {children}
                <ModalDismissButton>
                    <div className="flex space-x-[42px] mb-4">
                        <Button
                            title="キャンセル"
                            className="bg-blue-100"
                            hoverColorType="hover:bg-blue-300"
                            type="button"
                        />
                        <Button title="決定" type="button" />
                    </div>
                </ModalDismissButton>
            </WhiteModalWrapper>
        </ModalContentsBase>
    );
}

export { SimpleModal, ModalDismissButton, ModalOpenButton, ModalContents };
