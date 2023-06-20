const mongoose = require('mongoose');
const { Schema } = mongoose;

const priorityEnum = ['low', 'medium', 'high'];

const NoteSchema = new Schema({
  topic: String,
  message: String,
  priority: {
    type: String,
    enum: priorityEnum,
  },
  time: String,
  dueDate: Date,
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;
