

import jwt from "jsonwebtoken"
const secret=process.env.JWT_SECRET
export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403).json({info:"User must be logged in first"});
        }

        console.log("the authenticated user : ", user)
        req.user = user;
        next();
    });
}