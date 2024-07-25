const { User, Thought, Reaction } = require('../models');
const connection =require('../config/connection');

const users = [
    {
        "username": "john_doe",
        "email": "john_doe@example.com",
        "thoughts": [],
        "friends": []
    },
    {
        "username": "jane_smith",
        "email": "jane_smith@example.com",
        "thoughts": [],
        "friends": []
    },
    {
        "username": "alice_jones",
        "email": "alice_jones@example.com",
        "thoughts": [],
        "friends": []
    }
];


const thoughts = [
    {
        "thoughtText": "This is my first thought!",
        "username": "john_doe",
        "reactions": []
    },
    {
        "thoughtText": "Another day, another thought.",
        "username": "jane_smith",
        "reactions": []
    },
    {
        "thoughtText": "Thinking about the future.",
        "username": "alice_jones",
        "reactions": []
    }
];

const reactions = [
    {
        "reactionBody": "Great thought!",
        "userName": "jane_smith"
    },
    {
        "reactionBody": "I agree!",
        "userName": "john_doe"
    },
    {
        "reactionBody": "Well said!",
        "userName": "alice_jones"
    }
];

connection.once('open', async() =>{
    await User.collection.deleteMany();
    await Thought.collection.deleteMany();
    await Reaction.collection.deleteMany();

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    await Reaction.collection.insertMany(reactions);
    process.exit(0);
});