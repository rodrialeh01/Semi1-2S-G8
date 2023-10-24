import axios from 'axios';

export const translate = async(req, res) => {
    try {
        const { text, language, id } = req.body;

        const url = 'https://177ia5z7ra.execute-api.us-east-1.amazonaws.com/Translate';
        const data = {
            text,
            language
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const respuesta = await axios.post(url, data, config);

        res.response({ textTranslate: respuesta.data, id: id });

    }
    catch (error) {
        res.response(null, error.message, 400);
    }
}

