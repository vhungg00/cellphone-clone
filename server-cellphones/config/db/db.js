import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB(){
    const url = process.env.DATABASE_URL;
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log("Connected to database: " + url)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;