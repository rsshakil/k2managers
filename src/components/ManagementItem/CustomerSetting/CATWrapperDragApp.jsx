import React from 'react';

export default function CATWrapperDragApp({ children }) {
    return (
        <>
            <div class="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-11">
                    <label htmlFor="" className="text-blue-100">
                        顧客作成時にに表示するフィールド設定
                    </label>
                </div>
                <div className="col-span-1">
                    <label htmlFor="" className="text-blue-100">
                        必須
                    </label>
                </div>
            </div>
            {children}
        </>
    );
}
