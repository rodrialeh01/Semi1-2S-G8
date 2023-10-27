import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const data_user = JSON.parse(localStorage.getItem("data_user"));
    let exist = false;
    if(data_user){
        exist = true;
    }
    const [userLog, setUserLog] = useState(exist);
    console.log(userLog)
    return (
        <AuthContext.Provider value={{ userLog, setUserLog }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuthContext = () => useContext(AuthContext)