const mongoose = require('mongoose');
require('dotenv').config();
const dbURI = process.env.DB_URI;

const setupDbConnection = async () => {
  try{  
    await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    console.log("Connection sucessful");
  }
  catch(err){
    console.error(err)
  }

}

module.exports = setupDbConnection;