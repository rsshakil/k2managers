import _ from 'lodash';
import Button from "../../Button/Button";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Note from "../../Form/FormInputs/Note";
import InputContainer from "../../Wrapper/InputContainer";

export default function BlockModalFooter({ errors = {}, setModalOpen, handleOnPressSave, memoFieldShow = true, saveBtnText = '決定' }) {
    let error = '';
    if (!_.isEmpty(errors)) {
        error = Object.values(errors).filter(x => x != "")[0];
    }

    console.log('error Arr', errors)
    console.log('error final', error)

    return (
        <div className="!px-0">
            {memoFieldShow &&
                <InputContainer className='flex flex-col mb-8 mt-24'>
                    <Note
                        label='メモ（2048文字まで）'
                        labelClassName={`text-white !text-blue-100`}
                        inputClassName='bg-blue-25'
                        type='text'
                        name='memo'
                    />
                </InputContainer>
            }
            <ErrorMessage className={error ? 'visible !mt-0' : 'invisible !mt-0'}>{error}</ErrorMessage>

            <div className=' flex space-x-[42px] mb-4'>
                <Button
                    title="キャンセル"
                    className="bg-blue-100"
                    hoverColorType="hover:bg-blue-300"
                    type="button"
                    onClick={setModalOpen}
                />
                <Button
                    title={saveBtnText}
                    type='submit'
                    onClick={handleOnPressSave}
                />
            </div>
        </div>
    )
}