import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
}

export const bucketConfig = {
    name: process.env.NAME_BUCKET,
    region: process.env.REGION_BUCKET,
    id: process.env.ACCESS_ID,
    key: process.env.ACCESS_KEY
}

export const cognitoConfig = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
}

export const rekognitionConfig = {
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.ACCESS_KEY,
    region: process.env.REGION_REKOGNITION
}

export const API_PORT = process.env.API_PORT || 4000;