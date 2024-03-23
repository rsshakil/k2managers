const ModalWrapper = ({ children, closeModal, nyscroll }) => {
    //nyscroll = no y scroll
    return (
        <div className="relative text-white overlay modal-overlay flex justify-center flex-col items-center overflow-x-auto">
            <div
                className={` ${
                    nyscroll === undefined ? 'overflow-y-scroll' : ''
                } modal1440-body wrap overscroll-auto  min-w-[1440px]`}
            >
                {children}
            </div>
        </div>
    );
};
export default ModalWrapper;
