const mongoose = require('mongoose');
require('dotenv').config();
const mySecret = process.env.DB_PASSWORD;

const setupDbConnection = async () => {
  try{  
    await mongoose.connect(`mongodb+srv://pruthviraj:${mySecret}@neog-cluster.emlkf.mongodb.net/myCommerceDatabase?retryWrites=true&w=majority`, {
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