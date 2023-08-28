const mongoose = require('mongoose');
const validator = require('validator');
const {toJSON, paginate} = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'project',
      },
      name: String,
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
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    assignee: {
      type: [
        {
          type: String,
          trim: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error('Invalid email');
            }
          },
        },
      ],
    },
    parent_task: {
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'project',
      },
      name: String,
      manager: {
        type: String,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      stage: {
        title: String,
        id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'stage',
        },
      },
    },
    child_task: {
      type: [
        {
          id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'project',
          },
          name: String,
          stage: {
            title: String,
            id: {
              type: mongoose.SchemaTypes.ObjectId,
              ref: 'stage',
            },
          },
          priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'low',
          },
        },
      ],
    },
    stage: {
      title: String,
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'stage',
      },
    },
    tag: {
      title: String,
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tag',
      },
    },
    time_logs: {
      type: [mongoose.SchemaType.ObjectId],
      ref: 'timelog',
    },
    company: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
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
