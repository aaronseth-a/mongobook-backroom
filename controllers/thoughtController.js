const { Thought, User } = require('../models');

module.exports = {

    async getThoughts(req,res){
        try{
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        }catch(err){res.status(500).json(err);}
    },

    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne(req.params.thoughtId)
            .select('-__v')
            .populate({path:'reactions', select:'-__v'});
        }catch(err){res.status(500).json(err);}
    },

    async createThought(req,res){
        try{
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new:true}
            );

            if(!user){
                return res.status(404).json({message:'Thought created, but there is no user with the ID'});
            }
            res.json('Post created!');
        }catch(err){res.status(500).json(err);}
    },

    async updateThought(req,res){
        try{}catch(err){res.status(500).json(err);}       
    },

    async deleteThought(req,res){
        try{}catch(err){res.status(500).json(err);}
    }


}