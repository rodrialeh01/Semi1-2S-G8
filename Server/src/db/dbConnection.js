import mongoose from 'mongoose';
import { dbConfig } from '../config/credentials.js';

export const connect = () => {

    let url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

    if (dbConfig.user && dbConfig.password) {
        // mongodb://root:root@localhost:27017/?authMechanism=DEFAULT
        url = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=admin`;
    }

    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
        console.log(error);
    }
};