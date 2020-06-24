const User = require("../models/user")

exports.createUser=async(req,res,next)=>{
    try{
        const newUser = await User.create({...req.body})
        res.json({
            "status":"success",
            "data":newUser
        })
    } catch(err){
        res.json({
            "status":"fail",
            "message":err.message
        })
    }
}

exports.readUser = async(req,res,next)=>{
    try{
        const allUsers = await User.find({})
        res.json({
            status:"success",
            data: allUsers
        })
    } catch(err) {
        res.json({
            status:"fail",
            message: err.message
        })
    }
}

exports.updateUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.userId)
        if(!user){
            throw new Error("No such user exists.")
        }
        const fields = Object.keys(req.body);
        fields.map(field => user[field] = req.body[field]);
        await user.save()
        res.json({
            status:"success",
            data:user
        })
        next();
    } catch(err) {
        res.json({
            status:"fail",
            message:err.message
        })
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.userId) 
        if(!user) {
            throw new Error("No such user exists.")
        }
        res.status(204).json({
            status: "successfully deleted user",
            data: null
        })

    } catch(err) {
        res.json({
            status:"fail",
            message:err.message
        })
    }
}