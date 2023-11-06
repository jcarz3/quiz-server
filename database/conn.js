import mongoose from "mongoose";

export default function connect() {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    "mongodb+srv://poltskie119:QPUIH6OkOsniAssa@cluster0.5mwzizq.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database Connected");
}
