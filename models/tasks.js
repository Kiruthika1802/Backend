const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, default: 'null' },
  priority: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },


}, { timestamps: true });
const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;
