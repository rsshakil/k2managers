import { useField } from 'formik';
import commonConstants from '../../../lib/commonConstants';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';

const Note = ({ label, labelClassName, inputClassName, placeholder, isRequired, height = 'h-32', ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label} {isRequired ? <AddRequiredMark /> : null}
            </label>
            <textarea
                className={`${height} p-2 hover:outline-1 active:outline-1 focus:outline-2 hover:outline-offset-0 active:outline-offset-0 focus:outline-offset-2 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] focus:transition-all focus:duration-100 focus:ease-in outline-none border border-solid border-blue-100 width-full placeholder-gray-300 ${inputClassName}`}
                placeholder={
                    placeholder
                        ? commonConstants.INPUT_PLACEHOLDER_PREFIX(placeholder)
                        : commonConstants.INPUT_PLACEHOLDER_PREFIX('メモ')
                }
                {...field}
                {...props}
            />
        </>
    );
};

export default Note;
