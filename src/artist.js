const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    retired: Boolean
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;