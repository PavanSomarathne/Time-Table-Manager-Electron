const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    rID: {
        type: String,
        unique: true,
        required: true
    },
    rType: {
        type: String,
        required: true
    },
    bID: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    availability: {
        type: Boolean,
        default: true
    }
});

RoomSchema.index({ rID: "text" })

module.exports = Room = mongoose.model('room', RoomSchema)