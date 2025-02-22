import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Mongodb connected successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

export default connectToDB;
