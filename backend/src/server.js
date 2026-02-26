import express from "express";
import dotenv from 'dotenv';
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json()); //req.body
app.use(cookieParser()); // to parse the cookies 

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make redy for deployment 
if(process.env.NODE_ENV  === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDb();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[FATAL] Port ${PORT} is already in use.`);
    console.error('Either stop the process using the port or change the PORT variable.');
    process.exit(1); // or try a fallback port
  } else {
    console.error('Server error', err);
    process.exit(1);
  }
});