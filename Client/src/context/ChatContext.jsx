import { createContext, useContext, useEffect, useState } from "react";
import Service from "../Service/Service";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [userC, setUserC] = useState(null);
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() => {
        const getUserChats = () => {
            if(userC?._id){
                setIsUserChatsLoading(true);
                setUserChatsError(null)
                Service.getUserChats(userC._id)
                .then((res) => {
                    setIsUserChatsLoading(false);
                    console.log("res:", res)
                    setUserChats(res.data.data);
                })
                .catch((err) => {
                    setUserChatsError(err);
                })
            }
        }

        getUserChats();
    }, [userC]);

    return (
    <ChatContext.Provider 
        value={{
            userC,
            setUserC,
            userChats,
            setUserChats,
            isUserChatsLoading,
            setIsUserChatsLoading,
            userChatsError,
            setUserChatsError
        }}
    >
        {children}
    </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext)