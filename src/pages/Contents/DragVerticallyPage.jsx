import React from 'react';
import Input from '../../components/controls/Input';
import DragVertically from '../../components/Draggables/DragVertically';

import LayoutWrapper from '../../components/Wrapper/LayoutWrapper';

const DragVerticallyPage = () => {
    return (
        <LayoutWrapper>
            <div className="h-30">
                <DragVertically>
                    <Input className={`mb-0`} placeholder="placeholder 1" />
                </DragVertically>
                <DragVertically>
                    <Input className={`mb-0`} placeholder="placeholder 2" />
                </DragVertically>
                <DragVertically>
                    <Input className={`mb-0`} placeholder="placeholder 3" />
                </DragVertically>
            </div>
        </LayoutWrapper>
    );
};

export default DragVerticallyPage;
