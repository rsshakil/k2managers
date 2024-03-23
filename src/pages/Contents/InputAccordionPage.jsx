import Input from '../../components/controls/Input';
import InputAccordion from '../../components/InputAccordion/InputAccordion';
import LayoutWrapper from '../../components/Wrapper/LayoutWrapper';

const InputAccordionPage = () => {
    return (
        <LayoutWrapper>
            <div className="w-[1130px]">
                <InputAccordion title="Accordion title">
                    <p>
                        The beauty of this thing called tailwind is it doesn’t impose design specification or how your
                        site should look like, you simply bring tiny components together to construct a unique user
                        interface. What Tailwind simply does is take a ‘raw’ CSS file, processes this CSS file over a
                        configuration file, and produce an output.
                    </p>
                </InputAccordion>
                <InputAccordion title="Another title">
                    <p>
                        Tailwind CSS is used for creating websites fast and easily. It is a utility-first CSS framework
                        for building custom user interfaces rapidly. It is a highly customizable, low-level CSS
                        framework that gives you all of the building blocks you need to build bespoke designs without
                        any annoying opinionated styles you have to fight to override.
                    </p>
                    <p>
                        Tailwind CSS is used for creating websites fast and easily. It is a utility-first CSS framework
                        for building custom user interfaces rapidly. It is a highly customizable, low-level CSS
                        framework that gives you all of the building blocks you need to build bespoke designs without
                        any annoying opinionated styles you have to fight to override.
                    </p>
                    <p>
                        Tailwind CSS is used for creating websites fast and easily. It is a utility-first CSS framework
                        for building custom user interfaces rapidly. It is a highly customizable, low-level CSS
                        framework that gives you all of the building blocks you need to build bespoke designs without
                        any annoying opinionated styles you have to fight to override.
                    </p>
                    <Input type="text" placeholder="something" />
                    <div>
                        <select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>
                </InputAccordion>
            </div>
        </LayoutWrapper>
    );
};

export default InputAccordionPage;
