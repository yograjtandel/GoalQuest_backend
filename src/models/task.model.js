const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    project_id: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    deadline: {
      type: String,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'low',
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    asignee: {
      type: [mongoose.SchemaTypes.ObjectId],
    },
    parent_task: {
      type: [mongoose.SchemaTypes.ObjectId],
    },
    child_task: {
      type: [mongoose.SchemaTypes.ObjectId],
    },
    time_logs: {
      type: [mongoose.SchemaTypes.ObjectId],
    },
    stage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'stage',
    },
    tag: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'tag',
    },
    time_logs: {
      type: [mongoose.SchemaType.ObjectId],
      ref: 'timelog',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('task', taskSchema);

module.exports = Task;
