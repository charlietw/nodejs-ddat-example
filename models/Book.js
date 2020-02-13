const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
})

module.exports = mongoose.model('Book', bookSchema);