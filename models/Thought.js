const {Schema, model, trusted} = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,

        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true
        },
        reactions:[
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction'
            }
        ]
    },
    {
        toJSON:{
            virtuals: true
        },
        id: false
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(()=>{
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;