import InputAccordion from '../InputAccordion/InputAccordion';
import Checkbox from '../Form/FormInputs/CheckboxInput';

const AccordionCheckBox = ({
    label,
    childLabel,
    Data,
    HandleEventData,
    EventData,
    show,
    isOpenModal,
    childrenLabel,
    btnTitle,
}) => {
    return (
        <div className="flex flex-col w-full mb-[170px]">
            <label className="text-blue-100" htmlFor={label}>
                {label}
            </label>
            <div className="ml-[96px] text-blue-100">
                <label>{childLabel}</label>
                <div className="ml-[2rem]">
                    {Data.map((title, index) => (
                        <InputAccordion title={title} key={index}>
                            <div className="ml-[98px] w-[588px]">
                                <select
                                    name=" "
                                    onChange={HandleEventData}
                                    className="h-8 pl-1 py-[4px] select-icon2 cursor-pointer outline-none border-b border-solid border-blue-50 w-full"
                                >
                                    {EventData.map((option) => (
                                        <option value={option} key={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {show && (
                                    <div className="flex flex-col mt-[1rem]">
                                        <div className="h-8">
                                            <Checkbox name=" " children={childrenLabel} />
                                        </div>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={isOpenModal}
                                    className="bg-blue-25 border-all tracking-normal w-full mt-[1rem]"
                                >
                                    {btnTitle}
                                </button>
                            </div>
                        </InputAccordion>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default AccordionCheckBox;
