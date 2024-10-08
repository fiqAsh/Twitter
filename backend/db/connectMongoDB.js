import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`mongodb connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`error connection to mongodb: ${error.message}`);
		process.exit(1);
	}
};

export default connectMongoDB;
