import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected to ${conn.connections.host}`);
    } catch (error) {
        console.error(`Error connecting to ${conn.connections.host}`);
        process.exit(1);
    }
}