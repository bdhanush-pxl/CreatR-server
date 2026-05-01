// import mongoose from "mongoose";


// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`,{
//             bufferCommands: false
//         })
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1)
//     }
// }

// export default connectDB;

import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
};

export default connectDB;