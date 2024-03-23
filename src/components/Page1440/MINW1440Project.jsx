import React from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Controls from "../controls/Controls";
import Footer from "../Modal/MIN-W1440-Project-content/Footer";
import OutlineButtonContainer from "../Wrapper/OutlineButtonContainer";

const MINW1440Project = () => {
    let items = [];
    for (let i = 0; i < 12; i++) {
        items.push("item");
    }
    return (
        <>
            {/* ----- outline button section ----- */}
            <OutlineButtonContainer>
                {items.map((item, index) => (
                    <Controls.OutlineButton key={index} text={item} />
                ))}
            </OutlineButtonContainer>

            <div style={{backgroundColor: 'blue' }}>
                <div className="ml-4 mr-4 flex" style={{backgroundColor: 'teal'}}>
                    <BreadCrumbs title={"breadcrumbs-root>breadcrumbs-root>breadcrumbs-root>"} />
                </div>
            </div>

            <div className='relative flex justify-center flex-col items-center' style={{ background:'rgb(207 250 254)'}}>
                <div className='page1440-body2 wrap overscroll-auto overlay min-w-[1440px]'  style={{ background:'rgb(190 242 100)'}} >
                    <div className='p-2 body-height2' style={{ background:'rgb(34 197 94)'}}>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                        This is Top Body<br/>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}
export default MINW1440Project;