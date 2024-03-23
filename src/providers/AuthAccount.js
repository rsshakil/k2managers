import React from "react";
const AuthAccountContext = React.createContext({});
export const useAuthAccountContext = () => {
    return React.useContext(AuthAccountContext);
};
export const AuthAccountProvider = (props) => {
    const [account, setAccount] = React.useState(null);
    const signin = (newAccount, callback) => {
        setAccount(newAccount);
        callback();
    };
    const signout = (callback) => {
        setAccount(null);
        callback();
    };
    const value = { account, signin, signout };
    return (<AuthAccountContext.Provider value={value}>
      {props.children}
    </AuthAccountContext.Provider>);
};
