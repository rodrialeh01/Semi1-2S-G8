import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

//temporal:

const TOKEN = "eyJraWQiOiJCQitoOUs0Mjg3SmJSN05vSUMwMU53RkhVNmVXYnlpVjBmcUNQYm5iZE40PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YzRjZjdhOC04OWUyLTQ1MGYtOWM4Zi0xZmFkNDEwM2ExOGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbEJzNXFMNEZjIiwiY29nbml0bzp1c2VybmFtZSI6IjljNGNmN2E4LTg5ZTItNDUwZi05YzhmLTFmYWQ0MTAzYTE4ZCIsIm9yaWdpbl9qdGkiOiIwNzdhZGVjMi01M2I5LTQxOGMtYTNiOC1iYmM4MDBjOWRlYmQiLCJhdWQiOiIyOWVoNzRyOGZlazNqOXNnMmFkdXN1ZXRqaSIsImV2ZW50X2lkIjoiZmExMzI4N2QtNjlhNS00ZjBmLThlOWQtM2M3ODYwNzA4ZWIzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTgxMzM0ODQsIm5hbWUiOiJBZG1pbiBBZG1pbiIsImN1c3RvbTpkcGkiOiIxMjMxMjMxMjMxMjMxIiwiZXhwIjoxNjk4MTM3MDg0LCJpYXQiOjE2OTgxMzM0ODQsImp0aSI6ImE4NzA0MmIzLTEzZjAtNGMyNy1iYmQ2LTgxZGRlMmM0MDRhYyIsImVtYWlsIjoieGV4YXZlcDU1NUBpYnRyYWRlcy5jb20ifQ.IENTojeo-9nxO7WMQvJ4M0CYoUomcnp75k4mlYcOnBaR43j8Sxy4nA0PEF42NSWKQVEsV-yGHEkmHo4XDpQG4XhbIpo5GtVwsEV83LrCy29LEE2qcZmtrTfLCfiEm_L-3-Cg4KI7bv_mccJl3XD9X8efP1ieXQ7iSKaH5v4lOI9UFryMuQ19c24koPEsCix7Uxvy24BrgadnUXtghhcczC4zEVCpXcEZTOR4GcUd5lJ1q5CRz6bUdGPWTDCeRIBLmlPGV_BZdF1MXh-RyH3CyNQly3zoEg6IzeGxxkbZMnUbgkTq_NxMupN1QgRAcedtNwUsg3cmxowfUNBOQV1d5A"; //PONER ACÁ EL TOKEN DE LOGIN



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
