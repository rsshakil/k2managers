const ToggleLock = ({ label, labelClassName, inputClassName, textLeft, textRight, ...props }) => {
    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label}
            </label>
            <label className="switchWrapper">
                <input type="checkbox" className="switchInput" id={props.id || props.name} {...props} />
                <div className="switchDisplay" before={textLeft} after={textRight}>
                    <div className="switchStatus centerPlace"></div>
                    <div className="switchBall"></div>
                </div>
            </label>
        </>
    );
};
export default ToggleLock;
