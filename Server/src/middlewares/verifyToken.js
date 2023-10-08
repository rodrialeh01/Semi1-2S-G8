import { CognitoJwtVerifier } from "aws-jwt-verify"
import { cognitoConfig } from "../config/credentials.js";

export const verifyToken = async(req, res, next) => {
    
    const authorizationHeader = req.headers.authorization || '';

    if(!authorizationHeader) {
        return res.response(null, 'No token provided', 401);
    }

    const token = authorizationHeader.replace('Bearer ', '');

    const verifier = CognitoJwtVerifier.create({
        userPoolId: cognitoConfig.UserPoolId,
        tokenUse: 'id',
        clientId: cognitoConfig.ClientId
    });

    try {
        const payload = await verifier.verify(token);
        req.user = payload.email;
    } catch (error) {
        // console.log(error);
        return res.response(null, 'Unauthorized, '+ error.message, 401);
    }
    next();
}