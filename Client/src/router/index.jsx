import { createBrowserRouter } from 'react-router-dom';
import Solicitudes from '../components/Friends/Solicitudes';
import AddFriend from '../components/Friends/add';
import SideBar from '../components/Home/SideBar';
import Home from '../components/Home/home';
import LayoutPrivate from '../layout/LayoutPrivate';
import Chatbot from '../pages/bot/chat';
import Chat from '../pages/chat/chat';
import FaceId from '../pages/login/faceid';
import Login from '../pages/login/login';
import Password from '../pages/login/password';
import Registro from '../pages/registro/registro';

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Login />
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path:"/login/password/:user",
        element: <Password />
    },
    {
        path:"/login/faceid/:user",
        element: <FaceId />
    },
    {
        path:"/registrarse",
        element: <Registro />
    },
    {
        path:"/user",
        element: <LayoutPrivate />,
        children: [
            {
                element: <SideBar />,
                children:[
                    {
                        path:"home",
                        element: <Home />
                    },
                    {
                        path:"solicitudes",
                        element: <Solicitudes />
                    },
                    {
                        path:"chat",
                        element: <Chat />
                    },
                    {
                        path:"chatbot",
                        element: <Chatbot />
                    },
                    {
                        path:"addfriends",
                        element: <AddFriend />
                    }
                ]
            }
        ]
    }
]);