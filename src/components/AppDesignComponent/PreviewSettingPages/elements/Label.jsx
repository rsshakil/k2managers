

export default function Label(props) {
    const { labelClass, labelStyle, labelText = '', requiredClass, requiredStyle, requiredText } = props;

    return (
        <label className={`${labelClass}`} style={labelStyle}>
            {labelText} <span className={`${requiredClass}`} style={requiredStyle}>{requiredText}</span>
        </label>
    )
}