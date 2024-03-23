import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { csvOperation } from '../../api/rest/trial';
import Button from '../../components/Button/Button';

// FIXME: fix all the commented issues and integrate rest api
export default function FunctionDevelopment() {
    const dispatch = useDispatch();

    const { handleSubmit } = useForm({ reValidateMode: 'upload' });
    const csv = (value) => dispatch(csvOperation(value));

    const getCustomers = async () => {};
    const createEvent = async () => {};
    const getProject = async () => {};
    const getProjects = async () => {};
    const getEvent = async () => {};
    const getEvents = async () => {};
    const getCategories = async () => {};

    return (
        <>
            <div className="h-9 px-4 flex justify-start items-center">
                <span className="pl-2 pr-3 align-middle text-blue-50 font-bold">K2 Function Development</span>
            </div>
            <form onSubmit={handleSubmit(csv)}>
                <Button type="submit" title="CSV" />
            </form>
            <div>
                <button onClick={getCustomers}>---------- CUSTOMERS ----------</button>
            </div>
            <div>
                <button onClick={getProjects}>---------- PROJECTS ----------</button>
            </div>
            <div>
                <button onClick={getEvents}>---------- EVENTS ----------</button>
            </div>
            <div>
                <button onClick={getCategories}>---------- CATEGORIES ----------</button>
            </div>
        </>
    );
}
