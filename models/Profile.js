const mongoose = require('mongoose')


const Profile = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    lastname: {
        type: String,
        trim: true,
        default: ''
    },
    firstname: {
        type: String,
        trim: true,
        default:''
    },
    kidname: {
        type: String,
        trim: true,
        default:''
    },
    kidschool: {
        type: String,
        default:''
    },
    grade: {
        type: String,
        default:0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', Profile)








  