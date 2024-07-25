const {Reaction, Thought} = require('../models');

module.exports={

    async createReaction(req,res){
        try{
            const reaction = await Reaction.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reaction: reaction.reactionId}},
                {new:true}
            );

            if(!thought){
                return res.status(404).json({message:'Reaction created, but there is no thought with that ID'});
            }
            res.json('Reaction created!');
        }catch(err){res.status(500).json(err);}
    },
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$pull: {reactionId: req.body.reactionId}},

            );
            
            if(!thought){
                return res.status(404).json({message:'There is no thought with that ID'});
            }
            res.json('Reaction removed!');

        }catch(err){res.status(500).json(err);}
    }

}