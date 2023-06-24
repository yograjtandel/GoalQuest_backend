const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const stageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
stageSchema.plugin(toJSON);
stageSchema.plugin(paginate);

/**
 * @typedef Stage
 */
const Stage = mongoose.model('stage', stageSchema);

module.exports = Stage;
