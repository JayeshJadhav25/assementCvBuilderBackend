const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const register = async ( req,res ) => {
    try {
        const { username,email,password,contactNumber } = req.body;
        if( username == null || email == null || password == null || contactNumber == null ) {
            let obj = {
                msg:'All the fields are compulsory',
                statusCode:400,
                status:false,
                result:[]
            }
            return res.status(400).json(obj);
        }
        const checkEmailExist = await userModel.checkEmailExist(email);
        if( checkEmailExist.length > 0 ) {
            let obj = {
                msg:'Email Id already register.',
                statusCode:409,
                status:false,
                result:[]
            }
            return res.status(409).json(obj);
            
        }

        const checkUsernameExist = await userModel.checkUsernameExist(username);
        if( checkUsernameExist.length > 0 ) {
            let obj = {
                msg:'Username is already taken.Please choose another name',
                statusCode:409,
                status:false,
                result:[]
            }
            return res.status(409).json(obj);
            
        }

        const hashPassword = await bcrypt.hash(password,8);
        req.body.password = hashPassword;
        const insertData = await userModel.create(req.body);
        let obj = {
            msg:'Registration succesfully.',
            statusCode:201,
            status:true,
            result:insertData
        }
        res.status(200).json(obj);

    } catch ( err ) {
        let errObj = {
            status:false,
            statusCode:500,
            msg:"Something Went Wrong",
            error:err
        }
        res.status(500).json(errObj)
    }
}

const login =async  ( req,res ) => {
    try {
        const { username,password } = req.body;

        if( username == null || password == null) {
            let obj = {
                msg:'All fields are compulsory',
                statusCode:400,
                status:false,
                result:[]
            }
            return res.status(400).json(obj);
        }

        const getUserDetail = await userModel.checkUsernameExist(username);
        if( getUserDetail.length > 0 ) {
            const checkPassword = await bcrypt.compare(password,getUserDetail[0].password);
            if( checkPassword ) {
                const payload = {
                    id: getUserDetail[0]._id
                }
        
                const token = jwt.sign(payload, process.env.JWT_SECREAT);
                res.status(200).json({
                    status:true,
                    statusCode:200,
                    token:token,
                    message:'Login Succesfull'
                })

            } else {
                let obj = {
                    msg:'Username or password is wrong',
                    statusCode:404,
                    status:false,
                    result:[]
                }
                return res.status(404).json(obj);
            }
        } else {
            let obj = {
                msg:'Username or password is wrong',
                statusCode:404,
                status:false,
                result:[]
            }
            return res.status(404).json(obj);
        }
    } catch ( err ) {
        console.log(err)
        let obj = {
            msg:'Username or password is wrong',
            statusCode:404,
            status:false,
            result:[]
        }
        return res.status(404).json(obj);
    }
}

module.exports = {
    register,
    login
}