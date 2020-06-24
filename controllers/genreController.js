const Genre = require("../models/genre")

exports.createGenre=async(req,res,next)=>{
    try{
        const newGenre = await Genre.create({...req.body})
        res.json({
            "status":"success",
            "data":newGenre
        })
    } catch(err){
        res.json({
            "status":"fail",
            "message":err.message
        })
    }
}

exports.readGenre = async(req,res,next)=>{
    try{
        const allGenres = await Genre.find({})
        res.json({
            status:"success",
            data: allGenres
        })
    } catch(err) {
        res.json({
            status:"fail",
            message: err.message
        })
    }
}

exports.updateGenre = async(req,res,next)=>{
    try{
        const genre = await Genre.findById(req.params.id)
        if(!genre){
            throw new Error("No such genre exists.")
        }
        const fields = Object.keys(req.body);
        fields.map(field => genre[field] = req.body[field]);
        await genre.save()
        res.json({
            status:"success",
            data:genre
        })
        next();
    } catch(err) {
        res.json({
            status:"fail",
            message:err.message
        })
    }
}