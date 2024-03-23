import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Modal1440 from '../../components/Modal/Modal';
import Modal95 from '../../components/Modal/Modal95';

const ShowComponent = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const { component } = location.state;

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="cursor-pointer" onClick={() => navigate('/modal')}>
                    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 ">
                        <Modal1440 />
                    </div>
                </div>
                <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 ">
                    <Button title="submit" />
                </div>
            </div>
            {component === 'modal960' && <Modal95 />}
        </>
    );
};
export default ShowComponent;
