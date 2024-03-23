import React, { useEffect, useState } from 'react';
import EventCalendar16Months from '../../components/Calendar/16MonthsCalendar/EventCalendar16Months';
import DatePickerLayout from '../../components/Calendar/DatePickerLayout/DatePickerLayout';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import ContextMenuTemplate from '../../components/ContextMenu/ContextMenuTemplate';
import Controls from '../../components/controls/Controls';
import FilterBuilder from '../../components/DxFilterBuilder/FilterBuilder';
import GanttChartTemplate from '../../components/GanttChart/GanttChartTemplate';
import GanttFilter from '../../components/GanttChart/GanttFilter';
import LayoutBody from '../../components/LayoutBody/LayoutBody';
import DragApp from '../../components/ListElementDrag/DragApp';
import DragAppType from '../../components/ListElementDrag/DragAppType';
import MapView from '../../components/MapView/MapView';
import Dialog from '../../components/Modal/Dialog';
import ModalScrollable from '../../components/Modal/ModalScrollable';
import CSVImportModal from '../../components/Modal/WhiteModal/CSVImportModal/CSVImportModal';
import LogListModal from '../../components/Modal/WhiteModal/LogListModal/LogListModal';
import TemplateModal from '../../components/Modal/WhiteModal/TemplateModal';
import InputContainer from '../../components/Wrapper/InputContainer';
import { contentLinks, pageStructureLinks } from './Links';

export default function LayoutTemplate() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalW960, setOpenModalW960] = useState(false);
    const [openModal16MonthCal, setOpenModal16MonthCal] = useState(false);
    const [templateModal, setTemplateModal] = useState(false);
    const [CSVImportSettingModal, setCSVImportSettingModal] = useState(false);
    const [content, setContent] = useState('Page structure');

    const [validFieldList, setValidFieldList] = useState('');
    const [buttonType, setButtonType] = useState({ buttonName: '有効フィールド追加', type: 'normal' });
    const [controlDragDrop, setDragDrop] = useState(
        {
            grid: { name: 'grid grid-cols-12 gap-1' },
            dragable: { show: false, space: 'col-span-1' },
            pen: { show: false, space: 'col-span-1' },
            checkbox1: { show: false, space: 'col-span-1' },
            info: { show: false, space: 'col-span-1' },
            info2: { show: false, space: 'col-span-1' },
            task: { show: false, space: 'col-span-1' },
            checkbox2: { show: false, space: 'col-span-1' },
            inputBox: { show: true, space: 'col-span-11' },
            inputBox2: { show: false, space: 'col-span-1' },
            trash: { show: true, space: 'col-span-1' },
        },
        []
    );

    const isOpenModal = () => {
        setOpenModal(true);
    };
    const isOpenModal16MonthCal = () => {
        setOpenModal16MonthCal(true);
    };
    const isOpenModalW960 = () => {
        setOpenModalW960(true);
    };
    const openTemplateModal = () => {
        setTemplateModal(true);
    };
    const openModalFunction = (argSetState) => { 
        argSetState(true);
    };
    
    useEffect(() => {
        const html = document.getElementsByTagName('body')[0];
        openModal ? html.classList.add('lock-scroll') : html.classList.remove('lock-scroll');
        return () => {
            html.classList.remove('lock-scroll');
        };
    }, [openModal]);

    return (
        <>
            <div className="h-6 px-4 flex justify-start items-center bg-green-100 ">
                <Controls.OutlineButton text="Page structure" onClick={() => setContent('Page structure')} />
                <Controls.OutlineButton text="dialog component" onClick={isOpenModal} />

                <Controls.OutlineButton text="Content" onClick={() => setContent('Content')} />
                <Controls.OutlineButton text="ContextMenu" onClick={() => setContent('ContextMenu')} />

                <Controls.OutlineButton text="Calendar" onClick={() => setContent('Calendar')} />
                <Controls.OutlineButton text="ColorPicker" onClick={() => setContent('ColorPicker')} />
                <Controls.OutlineButton text="GanttChart" onClick={() => setContent('GanttChart')} />
                <Controls.OutlineButton text="16 Months Calendar" onClick={isOpenModal16MonthCal} />
                <Controls.OutlineButton text="FilterBuilder" onClick={() => setContent('FilterBuilder')} />
                <Controls.OutlineButton text="MapView" onClick={() => setContent('MapView')} />
                <Controls.OutlineButton text="Drag Table" onClick={() => setContent('Drag Table')} />
                <Controls.OutlineButton text="Scrollable Modal" onClick={isOpenModalW960} />
                <Controls.OutlineButton text="Template Modal" onClick={openTemplateModal} />
                <Controls.OutlineButton
                    text="CSV Import Modal"
                    onClick={() => openModalFunction(setCSVImportSettingModal)}
                />
                <Controls.OutlineButton text="Modal" onClick={() => setContent('Modal')} />
            </div>
            <div className="h-9 px-4 flex justify-start items-center">
                <span className="pl-2 pr-3 align-middle text-blue-50 font-bold">K2 Layout Template</span>
            </div>
            {/* Page Container  */}
            <div className="relative flex justify-center flex-col items-center">
                {/* Page Structure */}
                {content === 'Page structure' && <LayoutBody title="Page Structure" data={pageStructureLinks} />}
                {content === 'Content' && <LayoutBody title="Content Links" data={contentLinks} />}
                {content === 'ContextMenu' && <LayoutBody title="ContextMenu" component={<ContextMenuTemplate />} />}
                {content === 'Calendar' && <LayoutBody title="Calendar" component={<DatePickerLayout />} />}
                
                {content === 'ColorPicker' && <LayoutBody title="ColorPicker" component={<ColorPicker />} />}
                {content === 'GanttChart' && (
                    <div className="w-full px-4">
                        <GanttFilter />
                        <GanttChartTemplate />
                    </div>
                )}
                {content === 'FilterBuilder' && <LayoutBody title="FilterBuilder" component={<FilterBuilder />} />}

                {content === 'MapView' && (
                    <div>
                        <LayoutBody title="MapView (場所名指定)" height="ml-0" component={<MapView q="東京タワー" />} />
                        <LayoutBody
                            title="MapView (住所指定)"
                            height="ml-0"
                            component={<MapView q="〒105-0011 東京都港区芝公園４丁目２−８" />}
                        />
                        <LayoutBody
                            title="MapView (緯度経度指定)"
                            height="ml-0"
                            component={<MapView q="35.6586,139.7454" />}
                        />
                    </div>
                )}
                {content === 'Drag Table' && <LayoutBody title="メンバー設定" component={<DragAppType />} />}
                {content === 'Modal' && (
                    <LayoutBody
                        title="Modal Content"
                        component={<LogListModal handleCancel={() => setContent(false)} />}
                    />
                )}
            </div>

            {openModal && (
                <Controls.PopUpModal>
                    <Dialog closeModal={setOpenModal} />
                </Controls.PopUpModal>
            )}
            {openModal16MonthCal && <EventCalendar16Months />}
            {openModalW960 && (
                <ModalScrollable
                    title="アイテム管理:"
                    leftBtnTitle="キャンセル"
                    rightBtnTitle="追加"
                    handleButtonLeft={() => setOpenModalW960(false)}
                >
                    <InputContainer>
                        <DragApp
                            title="イベント内有効フィールド（128個まで）"
                            buttonTitle="有効フィールド追加　"
                            dragList={validFieldList}
                            buttonType={buttonType}
                            controlDragDrop={controlDragDrop}
                            addLimit={128}
                        />
                    </InputContainer>
                    <InputContainer>
                        <DragApp />
                    </InputContainer>
                </ModalScrollable>
            )}
            {templateModal && (
                <TemplateModal title="顧客一覧テンプレート" handleCancel={() => setTemplateModal(false)} />
            )}
            {CSVImportSettingModal && (
                <CSVImportModal title="CSVインポート" handleCancel={() => setCSVImportSettingModal(false)} />
            )}
        </>
    );
}
