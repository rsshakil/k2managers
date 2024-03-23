const BreakView = (props) => {
    const { breakLabel, breakClassName, breakLinkClassName, breakHandler, getEventListener } = props;
    const className = breakClassName || 'break';

    return (
        <li className={className}>
            <a
                className={breakLinkClassName}
                role="button"
                tabIndex="0"
                onKeyPress={breakHandler}
                {...getEventListener(breakHandler)}
            >
                {breakLabel}
            </a>
        </li>
    );
};

export default BreakView;
