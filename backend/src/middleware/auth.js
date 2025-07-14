// @ imports
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res
            .status(401)
            .json({ success: false, msj: `Not authenticated` });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(`error in verify token: ${error}`);
        return res.status(403).json({ success: false, msj: `Invalid Token` });
    }
};
