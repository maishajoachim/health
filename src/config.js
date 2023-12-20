const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGO_URI);

//check the database connection or not

connect.then(() => {
    console.log("database connected successfully");
})
.catch(() => {
    console.log("database cannot be connected");
})

//create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//collection model
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;