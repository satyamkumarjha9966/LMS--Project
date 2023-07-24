import User from "../models/user.model.js";
import AppError from '../utils/error.util.js';
import cloudinary from "cloudinary";
import fs from 'fs/promises';

const cookieOptions = {
    maxAge: 7*24*60*60*1000,     // 7 Days
    httpOnly: true,
    secure: true
}

const register = async (req, res, next) => {
    // Destructuring User Data
    const {fullName, email, password} = req.body;

    // Cross Check 1  || If any field is empty by User
    if (!fullName || !email || !password) {
        return next(new AppError('All Fields are Required', 400));    // ye abhi pura object return kar dega isliye hum middleware (by next) ka use karenge 
    }

    // Cross Check 2  || If Email Already Exist 
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new AppError('Email Already Exist', 400));
    }

    // Collecting Data in Variable
    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
        }
    });

    // Cross Check 3  || If User Data Does not Save in DB
    if (!user) {
        return next(new AppError('User Registeration Failed, Pls Try Again', 500));
    };

    // Profile Image  = File Upload
    console.log('File Details > ', JSON.stringify(req.file));
    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LMS',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove File From Server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError(error || "File Not Uploaded, Pls Try Again", 500));
        }
    }

    // Saving User Data in DB
    await user.save();

    // To prevent sending password
    user.password = undefined;

    // Generating user Token (by generic method)
    const token = await user.generateJWTToken();

    // For Automatic Login || To save/set cookie in browser
    res.cookie('token', token, cookieOptions);

    // Sending Response to User on Successfull Registeration
    res.status(201).json({
        success: true,
        message: 'User Registered SuccessFully',
        user
    });
};

const signin = async (req, res) => {

    try {
        const { email, password } = req.body;
    
        // Cross Check 1  || If any field is empty by User
        if (!email || !password) {
            return next(new AppError('All Fields are Required', 400));    
        }
    
        // Finding user in DB
        const user = await User.findOne({
            email
        }).select('+password');               // Explicity Password Manga hai
    
        // Cross Check 2  || If email or password does not match
        // To compare plain and Encrypted Password
        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or Password does not Match', 400));
        };
    
        // Generating JWT Token
        const token = await user.generateJWTToken();
        user.password = undefined;
    
        // Saving JET Token in Cookie
        res.cookie('token', token, cookieOptions);
    
        // Sending Success Message on User Successfully  Login
        res.status(200).json({
            success: true,
            message: 'User Loggedin Successfully',
            user
        });
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
};

const logout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User Successfully Logged Out'
    });
};

const getProfile = async (req, res) => {
    try {
        // finding user id in auth.middleware.js  
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: 'User Details',
            user
        });
    } catch (err) {
        return next(new AppError("Failed to Fetch User Details", 400));
    }
};

export {
    register,
    signin,
    logout,
    getProfile
};