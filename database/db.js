import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.URI)
        .then(() => {
            console.log("Mongodb connected successfully.");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
};

export default connectToDB;
