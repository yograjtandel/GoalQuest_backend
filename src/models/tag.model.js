const mongoose = require('mongoose');
const validator = require('validator');
const {toJSON, paginate} = require('./plugins');

const tagSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
tagSchema.plugin(toJSON);
tagSchema.plugin(paginate);

/**
 * @typedef Stage
 */
const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
