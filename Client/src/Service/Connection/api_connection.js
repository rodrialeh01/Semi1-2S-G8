import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

//temporal:

const TOKEN = ""; //PONER ACÁ EL TOKEN DE LOGIN



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
