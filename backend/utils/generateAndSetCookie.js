import jwt from 'jsonwebtoken';

export const generateAndSetCookie = (res, userId) => {  
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie('token', token, cookieOptions);

    return token;
}