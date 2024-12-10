import mongoose from 'mongoose';

const connection= {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Using existing connection.");
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Use previous connection");
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    console.log("New connection created");

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;