import React from "react";
import './Page960.css';
import Navbar from "../Navbar/Navbar";
import Page960Body from "./Page960Body";
const Page960 = () => {
    return (
        <>
            <Navbar
                title={"選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除"}/>
                <div className='content min-h-full overlay'>
                <Page960Body />
               </div>
        </>
    );
}

export default Page960;
