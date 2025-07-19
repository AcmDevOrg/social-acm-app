import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    if (initialized || mongoose.connection.readyState >= 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'social-acm-app',             
        });
        console.log('Connected to MongoDB');
        initialized = true;
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);        
    }
};