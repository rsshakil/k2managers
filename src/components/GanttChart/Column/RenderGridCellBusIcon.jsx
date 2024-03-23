import Button from 'devextreme-react/button';
import { FaBus } from 'react-icons/fa';

// Second Column Render Custom Component START
const RenderGridCellBusIcon = ({ data, handleBusIcon }) => {
    return (
        <>
            {data.data.type && data.data.type === 'date' && data.data.bus ? (
                <Button width={25} hint="バス路線設定" icon="bus" onClick={() => handleBusIcon(data.data.mappingId)}>
                    <FaBus className="text-blue-100" />
                </Button>
            ) : null}
        </>
    );
};

export default RenderGridCellBusIcon;
