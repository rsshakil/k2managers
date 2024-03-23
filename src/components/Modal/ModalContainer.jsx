function ModalContainer({ children, width = 'w-[1440px]', hasBorder = false }) {
    return (
        <div className="overlay fixed w-full h-full backdrop-blur-md top-0 right-0 bottom-0 z-[1000] align-middle text-white overflow-scroll dialog bg-black/[75%]">
            <div className="min-h-full">
                <div className={`${width} pt-16 p-8 mx-auto  flex-container   ${hasBorder ? '!p-0' : ''}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalContainer;
