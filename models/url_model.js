const mongoose = require('mongoose');

const urlschema = mongoose.Schema({
    longurl:String, 
    shorturl:String, 
    created:Date
});

const Url = mongoose.model('url', urlschema);

module.exports = Url;