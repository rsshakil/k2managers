import WhiteModalWrapper from '../Modal/components/WhiteModalWrapper';
import Button from '../Button/Button';
import { Formik } from 'formik';
import ModalTitle from '../Modal/components/ModalTitle';
import InputContainer from '../Wrapper/InputContainer';
import SelectBox from '../Form/FormInputs/SelectBox';
import { useEffect } from 'react';
import { useState } from 'react';
import { iconList } from '../../lib/commonConstants';
import { useRef } from 'react';

const CheckboxIconModal = ({ defaultSelected, onPressClose, onPressSave = () => { }, resetIcon = () => { } }) => {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedIconName, setSelectedIconName] = useState(defaultSelected);
    const [selectedIconGroup, setSelectedIconGroup] = useState('antDesignIcons');
    const [icons, setIcons] = useState([]);
    let iconGroupList = {
        antDesignIcons: 'antDesign',
        bootstrapIcons: 'bootstrap',
        boxIcons: 'boxIcons',
        circumIcons: 'circumIcons',
        cssIcon: 'cssIcons',
        devicons: 'devIcons',
        feather: 'featherIcons',
        flatColorIcons: 'flatColorIcons',
        fontAwesome: 'fontAwesomeIcons',
        githubOcticonsIcons: 'githubIcons',
        grommetIcons: 'grommetIcons',
        heroicons: 'heroIcons',
        heroicons2: 'heroIcons2',
        icoMoonFree: 'icoMoonFreeIcons',
        ionicons4: 'ionIcons4',
        ionicons5: 'ionIcons5',
        materialDesignIcons: 'materialDesignIcons',
        radixIcons: 'radixIcons',
        remixIcon: 'remixIcons',
        simpleIcons: 'simpleIcons',
        simpleLineIcons: 'simpleLineIcons',
        tablerIcons: 'tablerIcons',
        themifyIcons: 'themifyIcons',
        typicons: 'typIcons',
        vSCodeIcons: 'vsCodeIcons',
        weatherIcons: 'weatherIcons',
    };
    const ref = useRef();
    const iconDivRef = useRef();

    const getData = (jsonEndPoint) => {
        fetch(`${process.env.PUBLIC_URL}/iconsGroup/${jsonEndPoint}.json`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setIcons(myJson);
            })
            .catch((e) => {
                console.warn('JSON FETCH ERROR:: ', e);
            });
    };

    const getDataIcons = (jsonEndPoint, myIconName, groupName) => {
        fetch(`${process.env.PUBLIC_URL}/iconsGroup/${jsonEndPoint}.json`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myIconName != '') {
                    let findIcon = myJson.find((item) => item.name == myIconName);
                    if (findIcon) {
                        setSelectedIconGroup(groupName);
                    }
                }
            })
            .catch((e) => {
                console.warn('JSON FETCH ERROR:: ', e);
            });
    };

    useEffect(() => {
        if (selectedIconName || selectedIconGroup) {
            selectedIconGroup === 'antDesignIcons' && getData('antDesign');
            selectedIconGroup === 'bootstrapIcons' && getData('bootstrap');
            selectedIconGroup === 'boxIcons' && getData('boxIcons');
            selectedIconGroup === 'circumIcons' && getData('circumIcons');
            selectedIconGroup === 'cssIcon' && getData('cssIcons');
            selectedIconGroup === 'devicons' && getData('devIcons');
            selectedIconGroup === 'feather' && getData('featherIcons');
            selectedIconGroup === 'flatColorIcons' && getData('flatColorIcons');
            selectedIconGroup === 'fontAwesome' && getData('fontAwesomeIcons');
            selectedIconGroup === 'githubOcticonsIcons' && getData('githubIcons');
            selectedIconGroup === 'grommetIcons' && getData('grommetIcons');
            selectedIconGroup === 'heroicons' && getData('heroIcons');
            selectedIconGroup === 'heroicons2' && getData('heroIcons2');
            selectedIconGroup === 'icoMoonFree' && getData('icoMoonFreeIcons');
            selectedIconGroup === 'ionicons4' && getData('ionIcons4');
            selectedIconGroup === 'ionicons5' && getData('ionIcons5');
            selectedIconGroup === 'materialDesignIcons' && getData('materialDesignIcons');
            selectedIconGroup === 'radixIcons' && getData('radixIcons');
            selectedIconGroup === 'remixIcon' && getData('remixIcons');
            selectedIconGroup === 'simpleIcons' && getData('simpleIcons');
            selectedIconGroup === 'simpleLineIcons' && getData('simpleLineIcons');
            selectedIconGroup === 'tablerIcons' && getData('tablerIcons');
            selectedIconGroup === 'themifyIcons' && getData('themifyIcons');
            selectedIconGroup === 'typicons' && getData('typIcons');
            selectedIconGroup === 'vSCodeIcons' && getData('vsCodeIcons');
            selectedIconGroup === 'weatherIcons' && getData('weatherIcons');
        }
    }, [selectedIconGroup, selectedIconName]);

    useEffect(() => {
        setTimeout(() => {
            let itemElement = document.querySelectorAll('.item');
            itemElement.forEach((el) => {
                if (el.innerText == defaultSelected) {
                    return el.classList.add('icon-group-border');
                }
            });
        }, 500);
    }, [selectedIconGroup]);

    useEffect(() => {
        if (selectedIconName != '') {
            for (const key in iconGroupList) {
                getDataIcons(iconGroupList[key], selectedIconName, key);
            }
        }
    }, []);

    const handleClick = (event) => {
        let target = event.target;
        let svgStr = '';
        let iconName = '';

        Array.from(document.querySelectorAll('.item')).forEach((el) => el.classList.remove('icon-group-border'));

        event.target.className === 'name'
            ? event.target.parentElement.classList.add('icon-group-border')
            : event.target.classList.add('icon-group-border');

        if (target && target.classList.contains('item')) {
            // iconDivRef.current.style.border = "2px solid #145c8f"

            svgStr = target.firstChild.innerHTML;
            // svgStr = svgStr.replace('height="1em"', '').replace('width="1em"', '')
            iconName = target.lastChild.innerText;


            // console.log('selected svg: ', svgStr)

            setSelectedIcon(svgStr);
            setSelectedIconName(iconName);
        }
    };

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="アイコン選択" className="font-bold text-center text-blue-100 text-xl" />

            <Formik>
                <div className="relative w-full h-full">
                    <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                        <div id="custom-icon-list" className="flex flex-col py-10" ref={ref}>
                            <InputContainer>
                                <SelectBox
                                    label="アイコングループ選択"
                                    labelClassName="text-start text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="selectedIconGroup"
                                    value={selectedIconGroup}
                                    onChange={(e) => setSelectedIconGroup(e.target.value)}
                                >
                                    {iconList.map((x) => (
                                        <option key={x.id} value={x.value}>
                                            {x.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>

                            <div className="icons" ref={iconDivRef}>
                                {icons &&
                                    icons.map((x) => (
                                        <div key={x.name} class="item" tabindex="0" onClick={(e) => handleClick(e)}>
                                            <div class="icon h2" dangerouslySetInnerHTML={{ __html: x.svg }}></div>
                                            <div class="name">{x.name}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Button
                            title="未選択状態にする"
                            className="bg-blue-100"
                            hoverColorType="hover:bg-blue-300"
                            type="button"
                            onClick={resetIcon}
                        />
                        <div className="flex space-x-[42px] mt-4">
                            <Button
                                title="キャンセル"
                                className="bg-blue-100"
                                hoverColorType="hover:bg-blue-300"
                                type="button"
                                onClick={onPressClose}
                            />
                            <Button
                                title="決定"
                                type="button"
                                onClick={() => onPressSave(selectedIcon, selectedIconName)}
                            />
                        </div>
                    </div>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
};

export default CheckboxIconModal;
