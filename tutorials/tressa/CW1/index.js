const express = require('express')
const app = express()
// const port = 8000
require("dotenv").config();
const mongoose = require("mongoose");

const mongoConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected successfully");
    } catch (error) {
        console.log(error);
    }
};
mongoConnect();

const UserSchema = mongoose.model("User", {
    name: String,
    email: String,
    phone: Number,
});

const User = new UserSchema({name: "Tressa Arikkadan", email: "tressa@gmail.com", phone: 1234567890});

User.save().then(()=> console.log("User is saved successfully!"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})