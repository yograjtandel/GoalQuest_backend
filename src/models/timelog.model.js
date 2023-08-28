const mongoose = require('mongoose');
const validator = require('validator');
const {toJSON, paginate} = require('./plugins');

const timelogSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    houres: {
      type: String,
    },
    billable: {
      type: Boolean,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    Note: {
      type: String,
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
timelogSchema.plugin(toJSON);
timelogSchema.plugin(paginate);

/**
 * @typedef TimeLog
 */
const TimeLog = mongoose.model('timelog', timelogSchema);

module.exports = TimeLog;
