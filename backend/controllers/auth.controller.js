import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAndSetCookie } from "../utils/generateAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessfullEmail } from "../mailtrap/emails.js";


export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            if (userAlreadyExists.isVerified) {
              return res.status(400).json({ success: false, message: 'User already exists' });
            } else {
              // User exists but not verified — regenerate verification token
              userAlreadyExists.verificationToken = Math.floor(100000 + Math.random() * 900000);
              userAlreadyExists.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000;
              await userAlreadyExists.save();

              generateAndSetCookie(res, userAlreadyExists._id);
              
              await sendVerificationEmail(userAlreadyExists.email, userAlreadyExists.verificationToken);
              return res.status(200).json({ success: true, message: 'Verification email resent' });
            }
          }
        const verificationToken = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000  // 10 mins
        })

        await user.save();

        generateAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, user.verificationToken);

        res.status(201).json({
            success: true, message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        }); 
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ success: true, message: 'Email verified successfully',user: {
            ...user._doc,
            password: undefined
        } });

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        if(!user.isVerified){
            return res.status(400).json({success: false, message: 'Email not verified'});
        }

        generateAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({success:true, message: "Logged in successfully", user:{
            ...user._doc,
            passowrd: undefined
        }})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success: true, message: 'Logged out successfully'});
}

export const forgotPassword= async(req,res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'User not found'});
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}` );

        res.status(200).json({success: true, message: 'Password reset link sent to your email'});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const resetPassword = async(req, res) =>{
    const {token} = req.params;
    const{password} = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if(!user){
            return res.status(400).json({success: false, message: 'Invalid or expired reset token'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save()
        await sendResetSuccessfullEmail(user.email)

        res.status(200).json({success: true, message: 'Password reset successfull'});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const checkAuth = async (req, res) => {
    const userId = req.userId;
    try{
        if(!userId){
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }

        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        })
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}