const { db } = require('../database/db');
const collectionName = 'users';

const checkEmailExist =async (email) => {
    const result = await db.collection(collectionName).find({email:email}).toArray();
    return result;

}

const checkUsernameExist = async (username) => {
    const result = await db.collection(collectionName).find({username:username}).toArray();
    return result;
}

const create = async (data) => {
    try {
        const result = await db.collection(collectionName).insertOne(data);
        console.log(result);
    } catch ( err ) {
        console.log(err)
        return err;
    }
}

module.exports = {
    checkEmailExist,
    checkUsernameExist,
    create
}