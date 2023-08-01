const mongoose = require('mongoose');
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
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
