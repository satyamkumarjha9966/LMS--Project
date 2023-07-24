import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'Name is Required'],
        minLength: [5, 'Name must be at least 5 Characters'],
        maxLength: [50, 'Name should be less than 50 Characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: 'String',
        required: [true, 'Email is Required'],
        lowercase: true,
        trim: true,
        unique: true,
        // match: []
    },
    password: {
        type: 'String',
        required: [true, 'Password is Required'],
        minLength: [8, 'Password must be at least 8 Characters'],
        select: false,      // Means Default Query me Password mat dena When intencially query me dena bas
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],          // How many types of role defining
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {timestamps: true});

// Password Encryption
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 8)
});

// Creating Extra Methods For User Models
userSchema.methods = {
    // Generating JWT Token
    generateJWTToken: async function () {
        return await jwt.sign(
            {id: this._id, email: this.email, subscription: this.subscription, role: this.role},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY 
            }
        )
    },

    // To compare plain and Encrypted Password
    comparePassword: async function (plainTextPassword) {
        return bcrypt.compare(plainTextPassword, this.password);
    },

    // Generating Reset Token
    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;     // !5 Min From Now 

        return resetToken;
    }
}

const User = model('User', userSchema);

export default User;