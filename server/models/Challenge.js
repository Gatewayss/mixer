const { Schema, model } = require('mongoose');

const challengeSchema = new Schema({
    challengeTitle: {
        type: String,
        required: 'You need to leave a challenge title!',
        trim: true
    }, 
    challengeDescription: {
        type: String,
        required: 'You need to leave challenge details!',
        trim: true
    }
});

const Challenge = model('Challenge', challengeSchema);

module.exports = Challenge;