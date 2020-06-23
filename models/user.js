const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required!"],
        trim: true
    },
    email: {
        type:String,
        required:[true,"Email is required!"],
        trim: true
    },
    password: {
        type:String,
        required: [true,"Password is required!"],
        trim: true
    }
}, {
        timestamp: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    throw new Error("You can't change the password.")
})

const User = mongoose.model("User",userSchema)
module.exports = User;