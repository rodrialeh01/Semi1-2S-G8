import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

//temporal:

const TOKEN = "eyJraWQiOiJCQitoOUs0Mjg3SmJSN05vSUMwMU53RkhVNmVXYnlpVjBmcUNQYm5iZE40PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YzRjZjdhOC04OWUyLTQ1MGYtOWM4Zi0xZmFkNDEwM2ExOGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbEJzNXFMNEZjIiwiY29nbml0bzp1c2VybmFtZSI6IjljNGNmN2E4LTg5ZTItNDUwZi05YzhmLTFmYWQ0MTAzYTE4ZCIsIm9yaWdpbl9qdGkiOiIyNWZjNDk0Yi0xNDNhLTQ5ZjYtOWQ4OC04OTEwNWVhNGI5OTYiLCJhdWQiOiIyOWVoNzRyOGZlazNqOXNnMmFkdXN1ZXRqaSIsImV2ZW50X2lkIjoiZWZmZmExMTctNTg4ZS00MjZmLWFjOWUtODIzYTkyZjk0MWUzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTcxODAyNzksIm5hbWUiOiJBZG1pbiBBZG1pbiIsImN1c3RvbTpkcGkiOiIxMjMxMjMxMjMxMjMxIiwiZXhwIjoxNjk3MTgzODc5LCJpYXQiOjE2OTcxODAyNzksImp0aSI6IjE3Y2U4YTQ1LWJjMGMtNGZlNi1hOTg5LTAxODM2ZDI4MmJkYyIsImVtYWlsIjoieGV4YXZlcDU1NUBpYnRyYWRlcy5jb20ifQ.H4JxW9_cXd8WiV58H6WGG3Sk6bUZyTbvYi-PKanxCx3nhu5Gj4pluBCZufjkd0A_2SBpubUvlzrfqm2jwUvlQEIpk-UC5RnXG8QL-F4-zgxNuK4PUhRxUEkmMgGPgD8Dj5WobUDj23D_XSMLYkbDtBSNgBG-YmINkITOFK8hnoGg5nMv5fwlAXGFHX5WhzRxwWkWZn99s9Obp5tZiRxO9KJmOaSZCHGtSkATocVqB6DR91cwnTL4YPJj7aZaU3jWNB9Ljdg-kBZiK8MMqt5ANAq9puFwCqyi7UeU_GWBtuG1lJcMuMTZNu6bemEV8ld52pne520cZl_sJia9_OI-vg"; //PONER ACÁ EL TOKEN DE LOGIN



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
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

// USUARIOS:
export const getUser = async () => {
    const response = await instance.get('/users', {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
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
