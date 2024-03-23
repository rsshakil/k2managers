import React from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import './Page1440.css';

import Container from "../Wrapper/Container";
import Page1440Body from "./Page1440Body";
const Page1440 = () => {
    return (
        <Container>
            <div style={{backgroundColor: 'blue', overflow: "hidden" }}>
                <div className="ml-4 mr-4 flex" style={{backgroundColor: 'teal'}}>
                    <BreadCrumbs title="breadcrumbs-root>breadcrumbs-root>breadcrumbs-root>" />
                </div>
            </div>
            <Page1440Body  className="page1440-body" />
        </Container>
    );
}
export default Page1440;
