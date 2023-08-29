const mongoose = require("mongoose");
const Stuff = new mongoose.Schema({
    amount: Number,
    operation: String,
},
    { timestamps: { createdAt: 'created_at' } },);

const Client = mongoose.model('Client', {
    name: String,
    lastname: String,
    coin: {
        type: Number,
        default: 0
    },
    weekday: String,
    time: String,
    teacherid: String,
    number: Number,
    subject: String,
    comments: [Stuff]
});

module.exports = Client