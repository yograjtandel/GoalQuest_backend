const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const tagSchema = mongoose.Schema(
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
tagSchema.plugin(toJSON);
tagSchema.plugin(paginate);

/**
 * @typedef Stage
 */
const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
