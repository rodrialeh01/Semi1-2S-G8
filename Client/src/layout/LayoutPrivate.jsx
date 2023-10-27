import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin/dist/index.js';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const LayoutPrivate = () => {
    const { userLog } = useAuthContext();
    Kommunicate.init("13c3c49aa5e1ca3637253675ef753ba12", {
        automaticChatOpenOnNavigation: true,
        popupWidget: true
    });
    return (
        <>
            {userLog ? <Outlet /> : <Navigate to="/" />}
        </>
    );
}

export default LayoutPrivate;