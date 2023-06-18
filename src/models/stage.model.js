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
 * Check if email is taken
 * @param {string} title - The user's email
 * @param {ObjectId} [excludeStageId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
stageSchema.statics.isStageTaken = async function (title, excludeStageId) {
  const stage = await this.findOne({title, _id: {$ne: excludeStageId}});
  return !!stage;
};

/**
 * @typedef Stage
 */
const Stage = mongoose.model('stage', stageSchema);

module.exports = Stage;
