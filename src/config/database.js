const mongoose = require("mongoose");

const connectDb = async ()=>{

    await mongoose.connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/Practice");
}


module.exports = connectDb;

