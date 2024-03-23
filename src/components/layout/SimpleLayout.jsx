import { Outlet } from 'react-router-dom';
import Protected from '../../routes/Protected';

export default function SimpleLayout() {
    return (
        <div>
            <Protected>
                <Outlet />
            </Protected>
        </div>
    );
}
// className='overflow-hidden lg:overflow-scroll lg:h-screen h-[100vh-15px]'