import { Button } from 'devextreme-react';
import React from 'react';

export default function UpperSection16Months({ prevYearButton, currentYear, nextYearButton, instituteName }) {
    return (
        <>
            <div className="calendar-upper text-blue-100 w-full">
                <div className="mt-[8px]">
                    {/* <div >開催日</div> */}
                    <div className="flex items-center text-center font-bold justify-center mb-4">
                        <div className="!text-blue-100">
                            <Button width={20} hint="Bus Shift" icon="chevrondoubleleft" onClick={prevYearButton} />
                        </div>
                        <span>&nbsp; {currentYear && currentYear}年 &nbsp;</span>
                        <div>
                            <Button width={20} hint="Bus Shift" icon="chevrondoubleright" onClick={nextYearButton} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
