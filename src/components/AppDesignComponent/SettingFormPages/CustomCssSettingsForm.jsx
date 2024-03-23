import StyleEditor from 'react-style-editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';

export default function CustomCssSettingsForm() {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activePageId } = recoilStateValue;

    const selectedPageDetail = useRecoilValue(getSelectedPageData);


    function handleOnChange(key, value) {
        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                settings: {
                    appSettingQuery: {
                        ...prevState.tabItems.settings.appSettingQuery,
                        [activePageId]: {
                            ...prevState.tabItems.settings.appSettingQuery[activePageId],
                            [key]: value
                        }
                    },
                }
            }
        }));
    }


    return (
        <div className='relative w-full'>
            <label className="text-blue-100 text-xs">カスタムCSS</label>
            <StyleEditor
                style={{ minHeight: 'calc(100vh - 180px)' }}
                defaultValue={selectedPageDetail?.customCss}
                onChange={(value) => handleOnChange('customCss', value)}
            />
        </div>
    )
}