import { useEffect, useState } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Solicitudes from '../components/Friends/Solicitudes';
import AddFriend from '../components/Friends/add';
import Sidebar from '../components/Home/SideBar';
import Home from '../components/Home/home';
import EditProfile from '../components/Profile/EditProfile';
import { useAuthContext } from "../context/AuthContext";
import LayoutPrivate from '../layout/LayoutPrivate';
import Chat from '../pages/chat/chat';
import FaceId from '../pages/login/faceid';
import Login from '../pages/login/login';
import Password from '../pages/login/password';
import Registro from '../pages/registro/registro';

const PrivateRoute = () => {
    const { userLog } = useAuthContext();
    console.log(userLog)
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("data_user"))
    );
    useEffect(() => {
    const interval = setInterval(() => {
        setUser(JSON.parse(localStorage.getItem("data_user")));
    }, 500);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    if (user) {
        return <Sidebar />;
    }

    return <Login />;
}

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
                element: <PrivateRoute />,
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
                        path:"addfriends",
                        element: <AddFriend />
                    },
                    {
                        path:"edit",
                        element: <EditProfile />
                    }
                ]
            }
        ]
    }
]);