import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js";
import transporter from "../configs/email.js";


// Generate JWT Token
const generateToken = (userId)=>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Register User
export const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password || password.length < 8){
            return res.json({success: false, message: 'Fill all the fields'})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})
        const token = generateToken(user._id.toString())
        res.json({success: true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Login User 
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials" })
        }
        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get User data using Token (JWT)
export const getUserData = async (req, res) =>{
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get All Cars for the Frontend
export const getCars = async (req, res) =>{
    try {
        const cars = await Car.find({isAvaliable: true})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Reset Password Directly
export const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        if (!email || !newPassword || newPassword.length < 8) {
            return res.json({ success: false, message: "Provide a valid email and a new password with at least 8 characters" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password has been reset successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Subscribe Newsletter API
export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.json({ success: false, message: "Please provide an email" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Sending to the submitted email
            subject: 'Welcome to Car Rental Newsletter!',
            html: `
                <h2>Never Miss a Deal!</h2>
                <p>Hello,</p>
                <p>Thank you for subscribing to our newsletter! You will now receive our latest offers, new arrivals, and exclusive discounts right in your inbox.</p>
                <p>Best regards,<br>The Car Rental Team</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.json({ success: true, message: "Subscription successful! Check your email." });

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: "Failed to send email. Ensure your credentials are set in .env"})
    }
}