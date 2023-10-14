import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

//temporal:

const TOKEN = "eyJraWQiOiJCQitoOUs0Mjg3SmJSN05vSUMwMU53RkhVNmVXYnlpVjBmcUNQYm5iZE40PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YzRjZjdhOC04OWUyLTQ1MGYtOWM4Zi0xZmFkNDEwM2ExOGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbEJzNXFMNEZjIiwiY29nbml0bzp1c2VybmFtZSI6IjljNGNmN2E4LTg5ZTItNDUwZi05YzhmLTFmYWQ0MTAzYTE4ZCIsIm9yaWdpbl9qdGkiOiI2ZmZlOWFjNi1mMzFiLTQ4YTYtYmMzOC1jYzljZTkxNmQ0NTYiLCJhdWQiOiIyOWVoNzRyOGZlazNqOXNnMmFkdXN1ZXRqaSIsImV2ZW50X2lkIjoiZmEwYjJhZTktMWIwNy00MTI5LTgyOGEtNWNhZTQ0ZjRjYjMwIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTcyNjUzNTksIm5hbWUiOiJBZG1pbiBBZG1pbiIsImN1c3RvbTpkcGkiOiIxMjMxMjMxMjMxMjMxIiwiZXhwIjoxNjk3MjY4OTU5LCJpYXQiOjE2OTcyNjUzNTksImp0aSI6IjBmZDk3ZGU4LTMwM2EtNDZkNC1hYzI0LTM1MTk4YmY1ZDUyOSIsImVtYWlsIjoieGV4YXZlcDU1NUBpYnRyYWRlcy5jb20ifQ.U2S4OQssC5goWInBU_WI3FbChtAI91AaJwzYHFiMMfzQ12DmOe27GfhAtF0qtWhBSCN6bTKjrvtfk5acnghzXbj2Ytn_Gb4kT-ptMSJT6UwOELfXyjidAGtSlJlHtsI6Y9_oW2bShV_73W5qLVg1Ixw9z3racVbSz8Jr4WP9wVp9KLedDUn-3y8wxrw5fyhwg8olqeFqSnOsO2Yz_LcRTAyyddFjuemgx1_aDSuRiZGBnH9JunOEgpD_GM5X610VyM5vQiPp_zw1VmnSH-AtmXNOx7D3xTWtVruvFJOBSahumzP9JRA1lQ8mDzQ-dX1dCrKj9EIJx_FFDSAxuZ0sKQ"; //PONER ACÁ EL TOKEN DE LOGIN



// PUBLICACIONES:
export const getPublications = async () => {
    console.log("getPublications");
    const response = await instance.get('/publications', {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
    });

    console.log(response);
    return response;
}

    //CREAR PUBLICACION
export const createPublication = async (data) => {
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
