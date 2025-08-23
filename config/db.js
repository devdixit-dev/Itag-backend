import mongoose from "mongoose";

const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => { console.log(`DB CONNECTED`) })
    .catch((e) => { console.log(`DB ERROR - ${e}`) });
}

export default ConnectDB;