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
        const user = await User.findById(req.params.id)
        if(!user){
            throw new Error("No such user exists.")
        }
        const fields = Object.keys(req.body);
        fields.map(field => user[field] = req.body[field]);
        user.save()
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