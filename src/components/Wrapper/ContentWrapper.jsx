import React from "react";

/* this wrapper will be used for 960px screen */
const ContentWrapper = ({ children }) => <div className="min-w-[960px]"> {children} </div>
export default ContentWrapper