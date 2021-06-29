const User = require("../model/user")
const dbService = require("../utils/dbService");
const { JWT,LOGIN_ACCESS,
    PLATFORM,FORGOT_PASSWORD_WITH} = require("../config/authConstant");
const jwt = require("jsonwebtoken");
const common = require("../utils/common");
const moment = require("moment");
const bcrypt = require("bcrypt");
const EmailService = require("./email/emailService");
const uuid = require("uuid").v4;

async function generateToken(user,secret){
    return jwt.sign( {id:user.id,email:user.email}, secret, {
        expiresIn: JWT.EXPIRESIN
    });
}
async function sendResetPasswordOtp(user) {
    try {
        let otp = common.randomNumber();
        let message = `OTP code for Reset password`;
        let otpMsg = `${message}: ${otp}`;
        let expires = moment();
        expires = expires.add(FORGOT_PASSWORD_WITH.EXPIRETIME, "minutes").toISOString();
        await dbService.updateDocument(User,user.id,{ resetPasswordLink: { code: otp, expireTime: expires } });
        let mail_obj = {
            subject: 'Your OTP',
            to: user.email,
            template: '/views/sendOTP',
            data: {
                isWidth: true,
                name: "username",
                email: user.email || '-',
                message: otpMsg,
                otp: otp
            }
        };
        EmailService.sendEmail(mail_obj);
        return true;
    } catch (e) {
        return false;
    }
}
let auth =  module.exports = {}
    auth.loginUser=async(username,password,url) => {
            try {
                let where ={email:username}
                const user = await dbService.getDocumentByQuery(User,where);
                if (user) {
                    const isPasswordMatched = await user.isPasswordMatch(password);
                    if (isPasswordMatched) {
                        const {password,...userData}=user.toJSON()
                        let token;
                        if(!user.role){
                            throw new Error("You have no assigned role.")
                        }
                        if(url.includes('admin')){
                            if(!LOGIN_ACCESS[user.role].includes(PLATFORM.ADMIN)){
                                throw new Error('you are unable to access this platform');
                            }
                            token = await generateToken(userData,JWT.ADMIN_SECRET)
                        }
                        else if(url.includes('device')){
                            if(!LOGIN_ACCESS[user.role].includes(PLATFORM.DEVICE)){
                                throw new Error('you are unable to access this platform');
                            }
                            token = await generateToken(userData,JWT.DEVICE_SECRET)
                        }
                        else if(url.includes('client')){
                                if(!LOGIN_ACCESS[user.role].includes(PLATFORM.CLIENT)){
                                throw new Error('you are unable to access this platform');
                            }
                            token = await generateToken(userData,JWT.CLIENT_SECRET)
                        }
                        else if(url.includes('desktop')){
                            if(!LOGIN_ACCESS[user.role].includes(PLATFORM.DESKTOP)){
                                throw new Error('you are unable to access this platform');
                            }
                            token = await generateToken(userData,JWT.DESKTOP_SECRET)
                        }
                        const userToReturn = { ...userData, ...{ token } };
                        return userToReturn;
                    } else {
                        throw new Error("incorrect password")
                    }
                } else {
                    throw new Error("user not exists")
                }
            } catch (e) {
                console.log(e)
                throw new Error(e)
            }
    },
    auth.changePassword=async(params)=>{
        try {
            let password = params.newPassword;
            let where = {_id:params.userId};
            let user = await dbService.getDocumentByQuery(User,where);
            if (user && user.id) {
                password = await bcrypt.hash(password, 8);
                let updatedUser = dbService.updateDocument(User,user.id,{password});
                if (updatedUser) {
                    return user;                    
                }
                return false;
            }
            return false;
        } catch (e) {
            return false;
        }
    },
    auth.sendResetPasswordNotification=async (user) => {
        let resultOfEmail=false;
        let resultOfSMS=false;
        try {
            if(FORGOT_PASSWORD_WITH.OTP.email){
                resultOfEmail = await sendResetPasswordOtp(user);
            }
            if(FORGOT_PASSWORD_WITH.OTP.sms){
                // call sms function
                resultOfSMS=true;
            }
            return {resultOfEmail,resultOfSMS};
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    auth.resetPassword=async (user, newPassword) => {
        try {
            let where = { _id: user.id };
            const dbUser = await dbService.getDocumentByQuery(User,where);
            if (!dbUser) {
                return {
                    flag: false,
                    message: "user not found",
                };
            }
            newPassword = await bcrypt.hash(newPassword, 8);
            await dbService.updateDocument(User, user.id, {
                password: newPassword,
                resetPasswordLink: null,
            });
            let mail_obj = {
                subject: 'Reset Password',
                to: user.email,
                template: '/views/resetPassword',
                data: {
                    isWidth: true,
                    email: user.email || '-',
                    message: "Password Successfully Reset"
                }
            };
            
            console.log(mail_obj);
            EmailService.sendEmail(mail_obj);
            return {
                flag: true,
                message: "Password reset successfully",
            };
        } catch (e) {
            return { flag: false, message: "Internal Server Error" };
        }
    }