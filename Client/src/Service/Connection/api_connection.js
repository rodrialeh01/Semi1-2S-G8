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
            'Authorization': `Bearer ${TOKEN}`
        }
    });
    return response;
}

// USUARIOS:
export const getUser = async (userId) => {
    const response = await instance.get(`/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
    });
    return response;
}


// OBTENER COMENTARIOS:
export const getComments = async (publicationId) => {
    const response = await instance.get(`/comments/${publicationId}`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
    });
    return response;
}

//PUBLICAR COMENTARIO
export const createComment = async (data) => {
    const response = await instance.post('/create/comment', data,{
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    });
    return response;
}

//OBTENER USUARIOS
export const getUsers = async () => {
    const response = await instance.get('/users', {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
    });
    return response;
}

//ACEPTAR SOLICITUD DE AMISTAD
export const acceptRequest = async (id) => {
    console.log("ESTOY EN ACCEPT REQUEST")
    const response = await instance.post(`/accept/request/friend/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        }
    });
    return response;
}

export const translate = async (data) => {
    const response = await instance.post('/translate', data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
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
