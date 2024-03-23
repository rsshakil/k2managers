import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export default function CsvExportImportSettingAddTemplateButton({
    startIcon,
    startIconDisable = true,
    addedTemplateSetting,
    addedTemplateButtonName = 'Please Sent Button Name',
    limit, // This features will implemented future 6/1/23 linkon
}) {
    const newLimit = limit || limit == 0 ? limit : 64;
    return (
        <>
            <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                {startIcon === undefined
                    ? startIconDisable && (
                          <AiOutlinePlus
                              className="h-[22px] w-[22px] z-10 mr-[-32px]"
                              onClick={() => addedTemplateSetting()}
                          />
                      )
                    : startIcon}
                <button
                    type="button"
                    onClick={() => addedTemplateSetting()}
                    className="w-full cursor-pointer"
                    disabled={newLimit < 512 ? false : true}
                >
                    {addedTemplateButtonName}
                </button>
            </div>
        </>
    );
}
