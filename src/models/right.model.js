const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const rightSchema = mongoose.Schema(
  {
    name: {
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
rightSchema.plugin(toJSON);
rightSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Role = mongoose.model('right', rightSchema);

module.exports = Role;
