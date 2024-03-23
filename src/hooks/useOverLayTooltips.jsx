import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const useOverLayTooltips = () => {
    const navigate = useNavigate();
    const tid = useMemo(() => uuidv4(), []);
    const [tooltipEnabled, setTooltipEnabled] = useState(false);

    const handleTooltip = useCallback(
        (e) => {
            if (e.offsetWidth < e.scrollWidth) setTooltipEnabled(true);
            else setTooltipEnabled(false);
        },
        [tooltipEnabled, setTooltipEnabled]
    );

    return { tid, tooltipEnabled, setTooltipEnabled, handleTooltip, navigate };
};

export default useOverLayTooltips;
