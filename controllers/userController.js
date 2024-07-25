const { User } = require('../models');

module.exports= {

    async getUsers(req, res){
        try{
            const users = await User.find();
            if(!users){
                return res.status(404).json({message: "No users available."})
            }
            
            res.json(users);

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res){
        try{
            const user = await User.findById(req.params.userId)
                .populate({path:'thoughts'})
                .populate({path:'friends'});

                if(!user){
                    return res.status(404).json({message: "No user with that id."})
                }
    
                res.json(user);

        }catch(err){
            console.error(err);
            res.status(500).json(err);}
    },

    async createUser(req,res){
        try{
            const dbUserData= await User.create(
                {username: req.body.username, email: req.body.email}, {new: true});
            res.json(dbUserData);
        }catch(err){res.status(500).json(err);}
    },

    async updateUser(req,res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body },
                {runValidators: true, new: true}
            );
            if(!user){
                return res.status(404).json({message: "No user with that id."});
            }

            res.json(user);

        }catch(err){res.status(500).json(err);}
    },

    async deleteUser(req,res){
        try{
            const user = await User.findByIdAndDelete(req.params.userId);
            if(!user){
                return res.status(404).json({message: "No user with that id."});
            }

            res.json({message: 'User successfully removed!'});

        }catch(err){res.status(500).json(err);}
       
    },

    async addFriend(req,res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            );
            if(!user){
                return res.status(404).json({message: "No user with that id."});
            }

        }catch(err){res.status(500).json(err);}        
    },

    async removeFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                { new: true}
            )
        }catch(err){res.status(500).json(err);}        
    }

}