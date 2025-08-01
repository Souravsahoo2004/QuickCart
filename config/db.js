import mongoose from "mongoose";

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function ConnectDB() {
    if(cached.conn) {
        return cached.conn
    }
 if(!cached.promise) {
    const opts = {
        BufferCommands:false
    }
     cached.promise =mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then((mongoose) => {
        return mongoose
    })
 }
 return (cached.conn = await cached.promise)
}
export default ConnectDB
