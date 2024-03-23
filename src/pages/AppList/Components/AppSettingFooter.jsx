import Button from '../../../components/Button/Button';

const AppSettingFooter = ({ btn_title1, formType, children, btn_title2 }) => {
    return (
        <div className="px-10">
            {children}

            <div className="flex space-x-[42px] mb-4">
                <Button
                    title={btn_title1}
                    className={`${formType === 'add' ? 'bg-blue-100' : 'bg-orange-300'}`}
                    hoverColorType={`${formType === 'add' ? 'hover:bg-blue-300' : 'hover:bg-orange-400'}`}
                    type={formType === 'add' ? 'submit' : 'button'}
                />
                <Button title={btn_title2} type="submit" />
            </div>
        </div>
    );
};
export default AppSettingFooter;
