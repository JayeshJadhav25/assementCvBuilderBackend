const cvModel = require('../models/cvModel')

const add = async (req,res) => {
    try {
        req.body.userId = req.user
        const result = await cvModel.add(req.body);
        let obj ={
            status:201,
            success:true,
            msg:'CV updated succesfully..',
            result:result
        }
        res.status(201).json(obj)
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

const get = async (req,res) => {
    try {
        const result = await cvModel.get(req.user);
        let obj ={
            status:200,
            success:true,
            msg:'CV details fetch succesfully..',
            result:result
        }
        res.status(200).json(obj)
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

const getCvById = async (req,res) => {
    try {
        const result = await cvModel.getCvById(req.params.id);
        let obj ={
            status:200,
            success:true,
            msg:'CV details fetch succesfully..',
            result:result
        }
        res.status(200).json(obj)
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

const deleteCv = async (req,res) => {
    try {
        const result = await cvModel.deleteCv(req.params.id);
        res.status(200).json({msg:'Deleted succesfully'})
    } catch ( err ) {
        console.log(err)
        let errObj = {
            status:false,
            statusCode:500,
            msg:"Something Went Wrong",
            error:err
        }
        res.status(500).json(errObj)
    }
}
module.exports = {
    add,
    get,
    getCvById,
    deleteCv
}