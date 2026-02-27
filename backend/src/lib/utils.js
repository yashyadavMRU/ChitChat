import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async(userId, res) => {
    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET) throw new Error("JWT_SCERET is not configured");

    // create the token for the user
    const token = jwt.sign({userId:userId}, JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return token;
};