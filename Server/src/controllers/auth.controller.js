import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import axios from 'axios';
import crypto from "crypto";
import { tipoObjeto } from '../config/constants.js';
import { cognitoConfig, rekognitionConfig } from "../config/credentials.js";
import { saveObj } from '../config/objectHandler.js';
import { User } from "../db/userModel.js";

const cognito = new CognitoUserPool(cognitoConfig);
const rekognition = new AWS.Rekognition(rekognitionConfig);

export const signUp = async (req, res) => {

    const { name, lastName, email, dpi, password } = req.body;

    const attributeList = [];

    const dataName = {
        Name: "name",
        Value: `${name} ${lastName}`
    };

    const attributeName = new CognitoUserAttribute(dataName);
    attributeList.push(attributeName);

    const dataEmail = {
        Name: "email",
        Value: email
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    const dataDPI = {
        Name: "custom:dpi",
        Value: dpi
    };

    const attributeDPI = new CognitoUserAttribute(dataDPI);
    attributeList.push(attributeDPI);

    const hash = crypto.createHash('sha256').update(password).digest('hex') + "s3m1s0c1a1**";

    cognito.signUp(email, hash, attributeList, null, async(err, result) => {
        if (err) {
            res.response(null, err.message, 400);
        } else {
            
            try {
                const { buffer, originalname } = req.file;
                const fileExtension = originalname.split('.').pop();

                const { Key, Location } = await saveObj(buffer, fileExtension, tipoObjeto.IMG);

                User.create({
                    name,
                    lastName,
                    email,
                    dpi,
                    password: hash,
                    pathImage: Location,
                    idImage: Key,
                    friends: []
                });

                res.response({ name, lastName, email, pathImage:Location }, "Usuario creado correctamente", 200);

            } catch (error) {
                console.log(error);
                res.response(null, error.message, 400);
            }
        }
    });
}

export const signInPassword = async (req, res) => {
    
    try{
        const { email, password } = req.body;

        const hash = crypto.createHash('sha256').update(password).digest('hex') + "s3m1s0c1a1**";

        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: hash
        });

        const userData = {
            Username: email,
            Pool: cognito
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async (result) => {
                
                const { jwtToken } = result.getIdToken();
                const { email } = result.getIdToken().payload;

                const user = await User.findOne({ email }, {__v: 0, password: 0, friends: 0 });

                res.response({ token: jwtToken, user }, "Usuario autenticado correctamente", 200);
            },
            onFailure: (err) => {
                res.response(null, err.message, 403);
            }
        });
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}

export const signInFaceID = async (req, res) => {

    try{

        const { email } = req.body;
        const { buffer:target } = req.file;

        const user = await User.findOne({ email }, { password: 1, pathImage: 1 });

        if(!user){
            return res.response(null, "User not found", 404);
        }

        const { data } = await axios.get(user.pathImage, { responseType: 'arraybuffer' });
        const source = Buffer.from(data, 'binary');

        const params = {
            SourceImage: {
                Bytes: source
            },
            TargetImage: {
                Bytes: target
            },
            SimilarityThreshold: 60
        };

        const { FaceMatches } = await rekognition.compareFaces(params).promise();

        console.log(FaceMatches[0].Similarity);

        if (FaceMatches.length > 0 && FaceMatches[0].Similarity > 70) 
        {
            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: user.password
            });

            const userData = {
                Username: email,
                Pool: cognito
            };

            const cognitoUser = new CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: async (result) => {
                    
                    const { jwtToken } = result.getIdToken();
                    const { email } = result.getIdToken().payload;

                    const user = await User.findOne({ email }, {__v: 0, password: 0, friends: 0 });

                    res.response({ token: jwtToken, user }, "Usuario autenticado correctamente", 200);
                },
                onFailure: (err) => {
                    res.response(null, err.message, 403);
                }
            });
        } else {
            res.response(null, "Face not found", 404);
        }

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}