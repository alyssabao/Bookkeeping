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
        const genre = await Genre.findById(req.params.genreId)
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

exports.deleteGenre = async(req,res,next)=>{
    try {
        const genre = await Genre.findByIdAndDelete(req.params.userId) 
        if(!genre) {
            throw new Error("No such genre exists.")
        }
        res.status(204).json({
            status: "successfully deleted genre",
            data: null
        })

    } catch(err) {
        res.json({
            status:"fail",
            message:err.message
        })
    }
}