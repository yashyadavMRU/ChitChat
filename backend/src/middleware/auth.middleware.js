import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import { ENV } from "../lib/env.js";
import "dotenv/config";

export const protectRoutes = async(req, res, next) => {

    try {
        const token = req.cookie.jwt;
        if(!token) return res.status(401).json({ message: "Unauthorized - No token provided"});

        const {JWT_SCERET} = process.env;
        if(!JWT_SCERET) throw new Error("JWT_SCERET is not configured");
        const decoded = jwt.verify(token, JWT_SCERET);

        if(!decoded) return res.status(401).json({ message: 'Unauthorized - Invalid token'});

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).jsson({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        res.status().json({ message: "Internal server error"});
    }

};