const { ObjectId } = require('mongodb');
const { db } = require('../database/db');
const collectionName = 'cv';

const add = async (data) => {
    try {
        let id = data._id;
        delete data._id;
        const result = await db.collection(collectionName).updateOne({_id:id},{$set:data},{upsert:true});
        return result
    } catch ( err ) {
        return err
    }
}

const get = async (userId) => {
    try {
        const result = await db.collection(collectionName).find({userId:userId}).toArray();
        return result;
    } catch ( err ) {
        return err;
    }
}

const getCvById = async (getCvById) => {
    try {
        const result = await db.collection(collectionName).find({_id:getCvById}).toArray();
        return result;
    } catch ( err ) {
        return err;
    }
}

const deleteCv = async (id) => {
    try {
        const result = await db.collection(collectionName).deleteOne({_id:id}).toArray();
        return result;
    } catch ( err ) {
        return err;
    }
}

module.exports = {
    add,
    get,
    getCvById,
    deleteCv
}