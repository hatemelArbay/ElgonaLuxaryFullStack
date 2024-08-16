const mongoose = require('mongoose');

const initializeDbConnection= async()=>{
    try {
        await mongoose.connect(process.env.dbConnection);
        console.log("connected to db successfully");
    }
    catch(error){
        console.log("error connecting to db because of error: " + error);
    }
}

module.exports = initializeDbConnection;