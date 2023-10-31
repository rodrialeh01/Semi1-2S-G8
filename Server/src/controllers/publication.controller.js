
import { Publication } from '../db/publicationModel.js';
import { User } from '../db/userModel.js';
import { rekognitionConfig } from "../config/credentials.js";
import { saveObj } from '../config/objectHandler.js';
import { tipoObjeto } from '../config/constants.js';
import AWS from 'aws-sdk';

const rekognition = new AWS.Rekognition(rekognitionConfig);

export const createPublication = async(req, res) => {
    try{
        const { user } = req;

        const idUser = await User.findOne({ email: user }, { _id: 1 });
        if (!idUser) return res.response(null, 'User not found', 404);
        
        const { buffer, originalname } = req.file;
        const fileExtension = originalname.split('.').pop();

        const { Labels } = await rekognition.detectLabels({
            Image: {
                Bytes: buffer
            },
            MaxLabels: 10,
            MinConfidence: 70
        }).promise();

        const labels = Labels.map(label => label.Name);

        const { Key:idImage, Location:pathImage } = await saveObj(buffer, fileExtension, tipoObjeto.IMG);
        const description = req.body.description;

        Publication.create({
            pathImage,
            idImage,
            description,
            idUser,
            labels
        });

        res.response(null, 'Publication created', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
}

export const getPublications = async(req, res) => {
    try{
        const { user } = req;

        const idUser = await User.findOne({ email: user }, { _id: 1, friends: 1 });
    
        const publications = await Publication.find({ idUser }, { __v: 0 });
        
        const publicationsFriends = await Publication.find({ idUser: { $in: idUser.friends } }, { __v: 0 });
    
        const allPublications = [...publications, ...publicationsFriends];
    
        // ordenar las publicaciones por fecha de creacion la mas reciente primero
        allPublications.sort((a, b) => b.createdAt - a.createdAt);

        const labels = new Set();
        allPublications.forEach(publication => {
            publication.labels.forEach(label => {
                labels.add(label);
            });
        });

        const allLabels = [...labels];

        const resp = {
            labels: allLabels,
            publications: allPublications
        }
    
        res.response(resp);
    } catch (error) {
        res.response(null, error.message, 400);
    }
}