import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export default async function connectDB(params) {
    try{
        await mongoose.connect(process.env.MONGODB_KEY)
        console.log("database Mongodb is connected")
    }
    catch(error){
        console.log("Errror message : ", error)
    }
    
}
