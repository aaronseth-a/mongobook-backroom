const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate:{
                validator: ()=>Promise.resolve(false),
                message: 'Email validation failed.'
            }
        },
        thoughts:[{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends:[{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON:{
            virtuals: true
        },
        id: false
    }
);

userSchema
    .virtual('friendCount')
    .get(()=>{
        return this.friends.length;
    }); 

const User = model('user', userSchema);

module.exports = User;