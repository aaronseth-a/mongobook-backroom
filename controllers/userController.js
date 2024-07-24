const { User } = require('../models');

module.exports= {

    async getUsers(req, res){
        try{
            const users = User.find().select('-__v');
            if(!users){
                return res.status(404).json({message: "No users available."})
            }
            
            res.json(users);

        }catch(err){res.status(500).json(err);}
    },

    async getSingleUser(req, res){
        try{
            const user = await User.findOne({_id: req.params.thoughtId})
                .select('-__v')
                .populate({path:'thoughts', select: '-__v'})
                .populate({path:'friends',select:'-__v'});

                if(!user){
                    return res.status(404).json({message: "No user with that id."})
                }
    
                res.json(user);

        }catch(err){res.status(500).json(err);}
    },

    async createUser(req,res){
        try{
            const dbUserData= await User.create(req.body, {new: true});
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
                return res.status(404).json({message: "No user with that id."})
            }

            res.json(user);

        }catch(err){res.status(500).json(err);}
    },

    async deleteUser(req,res){
        try{
            const user = await User.findOneAndRemove({_id:req.params.userId});
            if(!user){
                return res.status(404).json({message: "No user with that id."})
            }

            res.json({message: 'User successfully removed!'});

        }catch(err){res.status(500).json(err);}
       
    },

    async addFriend(req,res){
        try{}catch(err){res.status(500).json(err);}        
    },

    async removeFriend(req, res){
        try{}catch(err){res.status(500).json(err);}        
    }

}