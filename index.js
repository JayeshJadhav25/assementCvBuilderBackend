const express = require('express');
require('dotenv').config();
const app = express();

const userRoute = require('./routes/userRoutes');

const cvRoutes = require('./routes/cvRoute');

const {client} = require('./database/db');

async function main() {
    try {
        await client.connect();
        console.log('Mongo Connected..');
    } catch ( err ) {
        console.log('failed to connect to mongo',err)
    }

}

main();

const port = process.env.PORT || 6000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())

app.use('/user',userRoute)

app.use('/cv',cvRoutes)




app.listen(port,() => {
    console.log(`server is runnign at ${port}...`)
})