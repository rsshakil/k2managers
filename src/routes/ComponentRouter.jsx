import MINW1440Table from '../components/MIN-W1440-Table/MIN-W1440-Table'
import MINW1440ProjectTable from '../components/MINW1440ProjectTable/MINW1440ProjectTable'
import Modal4 from '../components/Modal/MIN-W1440-Project-content/Modal4'
import Modal10 from '../components/Modal/Modal10'
import Page1440 from '../components/Page1440/Page1440'
import Page960 from '../components/Page960/Page960'
import InputAccordionPage from '../pages/Contents/InputAccordionPage'
import K2FunctionDevelopment from '../pages/FunctionDevelopment/FunctionDevelopment'
import LayoutTemplate from '../pages/LayoutTemplate/LayoutTemplate'

/*import Content1 from "../components/Content/Content1"*/

import MINW1440Project from "../components/Page1440/MINW1440Project"
import DragHorizontallyPage from '../pages/Contents/DragHorizontallyPage'
import DragVerticallyPage from '../pages/Contents/DragVerticallyPage'
import FileUpload from '../pages/Contents/FileUpload'
import SlotTable from '../pages/SlotTable/SlotTable'
import ModalScrollable from "../components/Modal/ModalScrollable";

const ComponentRouter = [
    /* --------------------  Added  ---------------------- */
    { path: '/MIN-W1440-Table', element: <MINW1440Table /> },
    { path: '/MIN-W1440-Project-Table', element: <MINW1440ProjectTable /> },
    { path: '/input_accordion', element: <InputAccordionPage /> },
    { path: '/drag_horizontally', element: <DragHorizontallyPage /> },
    { path: '/drag_vertically', element: <DragVerticallyPage /> },

    /* -------------- these are added------------------- */
    { path: '/MIN-W1440-overlay-dialog', element: <Modal10 /> },
    { path: '/ModalScrollable', element: <ModalScrollable /> },
    { path: '/MIN-W1440-project-content', element: <Modal4 /> },
    { path: '/MIN-W960-content', element: <Page960 /> },
    { path: '/MIN-W1440-content', element: <Page1440 /> },
    { path: '/MIN-W1440-project', element: <MINW1440Project /> },
    { path: '/slotTable', element: <SlotTable /> },
    /*{ path: '/Content-1', element: <Content1 /> },*/

    /* Added Routes */
    { path: '/k2_layout_design', element: <LayoutTemplate /> },
    { path: '/k2_function_development', element: <K2FunctionDevelopment /> },
    { path: '/fileUpload', element: <FileUpload /> },
    
]

export default ComponentRouter