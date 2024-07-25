const { Thought, User } = require('../models');

module.exports = {

    async getThoughts(req,res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            console.error(err);
            res.status(500).json(err);}
    },

    async getSingleThought(req, res){
        try{
            const thought = await Thought.findById(req.params.thoughtId)
            .populate({path:'reactions'});
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
        try{
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if(!thought){
                return res.status(404).json({message: "No thought with that id."});
            }

            res.json({message: 'Thought successfully removed!'});

        }catch(err){res.status(500).json(err);}
    }


}