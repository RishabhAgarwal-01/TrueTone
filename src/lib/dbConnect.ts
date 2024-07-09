import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number  //this is the readyState of the Mongoose connections object
    //it has 0 value for disconnected, 1 for connected, 2 - connecting and 3 for disconnecting
}

const connection:ConnectionObject ={}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Alreadyt connected to database");
        return;
    }

    try {
     const db=  await mongoose.connect(process.env.MOGODB_URI|| '', {});

     connection.isConnected = db.connections[0].readyState //so the whole db.connections is an array with lot's of values taking the [0] index value and then the from it ready state
    
     console.log("db:", db)
     console.log("db connections", db.connections);
     console.log("db connected successfully")
    } catch (error) {
        
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;