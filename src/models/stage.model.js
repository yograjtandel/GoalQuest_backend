const mongoose = require('mongoose');
const validator = require('validator');
const {toJSON, paginate} = require('./plugins');

const stageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    display_sequence: {type: Number, required: true},
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
stageSchema.plugin(toJSON);
stageSchema.plugin(paginate);

/**
 * @typedef Stage
 */
const Stage = mongoose.model('stage', stageSchema);

module.exports = Stage;
