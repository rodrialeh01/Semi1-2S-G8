import { Outlet } from 'react-router-dom';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin/dist/index.js'

const LayoutPrivate = () => {
    Kommunicate.init("13c3c49aa5e1ca3637253675ef753ba12", {
        automaticChatOpenOnNavigation: true,
        popupWidget: true
      });
    return (
        <>
            <Outlet />
        </>
    );
}

export default LayoutPrivate;