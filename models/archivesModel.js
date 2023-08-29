const mongoose = require("mongoose");
// const Stuff = new mongoose.Schema({
//     info: Object
// },
//     { timestamps: { createdAt: 'created_at' } },);
const Archives = mongoose.model('Archives', {
    archive: Object
});

module.exports = Archives