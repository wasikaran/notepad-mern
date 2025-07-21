const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        default: 'general'
    },
      Date:{
    type: Date,
    default: Date.now 
   },    
})

module.exports = mongoose.model('Notes', NotesSchema)