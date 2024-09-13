import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.connect(url)
        .then(() => { console.log('Db Connected') })
        .then(() => { server() })
        .catch((err) => { console.log('The Err is: ', err.message) })
}


module.exports = connectDB;