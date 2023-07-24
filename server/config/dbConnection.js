import mongoose from "mongoose";

mongoose.set('strictQuery', false);    // Query is not in strict if small error come in querry ignore it not give error

const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
    
        if (connection) {
            console.log(`Connected to MongoDB:${connection.host}`);
        }     
    } catch (error) {
        console.log(error);
        process.exit(1);        // Means end the complete process
    }
};

export default connectionToDB;