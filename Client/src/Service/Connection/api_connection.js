import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});


//temporal:

//REGISTRO:
export const registroUsuario = async (data) => {
    const response = await instance.post('/sign/up', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

//LOGIN-PASSWORD:
export const loginPassword = async (data) => {
    const response = await instance.post('/sign/in/password', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

//LOGIN-FACEID
export const loginFaceId = async (data) => {
    const response = await instance.post('/sign/in/faceID', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

// PUBLICACIONES:
export const getPublications = async (token) => {
    console.log("getPublications");
    console.log(token);
    const response = await instance.get('/publications', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    console.log(response);
    return response;
}

    //CREAR PUBLICACION
export const createPublication = async (data, token) => {
    const response = await instance.post('/create/publication', data,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

// USUARIOS:
export const getUser = async (userId, token) => {
    const response = await instance.get(`/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}


// OBTENER COMENTARIOS:
export const getComments = async (publicationId, token) => {
    const response = await instance.get(`/comments/${publicationId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}

//PUBLICAR COMENTARIO
export const createComment = async (data, token) => {
    const response = await instance.post('/create/comment', data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//OBTENER USUARIOS
export const getUsers = async (token) => {
    const response = await instance.get('/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}

//ACEPTAR SOLICITUD DE AMISTAD
export const acceptRequest = async (id, token) => {
    console.log("ESTOY EN ACCEPT REQUEST")
    const response = await instance.post(`/accept/request/friend/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
}

export const translate = async (data, token) => {
    const response = await instance.post('/translate', data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//CHATS
//OBTIENE LOS CHATS
export const getUserChats = async (token, id) => {
    const response = await instance.get(`/api/chats/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//OBTIENE LOS MENSAJES DE UN CHAT
export const getChatMessages = async (token, id) => {
    const response = await instance.get(`/api/messages/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//CREA UN CHAT
export const createChat = async (token, data) => {
    const response = await instance.post('/api/chats', data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export const getChats = async (token, id) => {
    const response = await instance.get(`/api/chats/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//Obtener los chats con los users
export const findUsersChats = async (token, id) => {
    const response = await instance.get(`/api/chats/find/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//OBTIENE INFO DEL CHAT
export const getChat = async (token, id1, id2) => {
    const response = await instance.get(`/api/chats/find/${id1}/${id2}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//ENVIA UN MENSAJE
export const sendMessage = async (token, data) => {
    const response = await instance.post('/api/messages', data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

//PLANTILLA
//JSON
/*
export const NOMBRE_METODO = async (data) => {
    const response = await instance.post('/endpoint', data,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}
*/

//FORM-DATA
/*
export const NOMBRE_METODO = async (data) => {
    const response = await instance.post('/endpoint', data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}
*/
