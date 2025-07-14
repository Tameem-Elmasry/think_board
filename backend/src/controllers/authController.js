// @ imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// @ functions
export const signUp = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            msj: "Please Input Username and Password",
        });
    }
    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ msj: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET
        );
        res.cookie("token", token, { httpOnly: true, secure: false }); // MO SET secure:true in production

        return res.status(201).json({
            success: true,
            msj: "User Created Successfully",
            token,
            data: newUser,
        });
    } catch (error) {
        console.log(`Error creating new User: ${error}`);
        return res.status(500).json({
            success: false,
            msj: `Error creating new user`,
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            msj: "Please Input Username and Password",
        });
    }
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, msj: "Invalid username or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ msj: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET
        );
        res.cookie("token", token, { httpOnly: true, secure: false });

        return res.status(200).json({
            success: true,
            msj: "Logged in Successfully",
            data: user,
            token,
        });
    } catch (error) {
        console.log(`Error logging in to user: ${error}`);
        return res
            .status(500)
            .json({ success: false, msj: `Error during Login` });
    }
};

export const checkAuth = (req, res) => {
    res.status(200).json({
        success: true,
        msj: `Authenticated`,
        user: req.user,
    });
};

export const logout = (_, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, //MO set to true in production if using HTTPS
        sameSite: "Lax",
    });
    res.status(200).json({ success: true, msg: "Logged out successfully" });
};
