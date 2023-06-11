const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const tagSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
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
 * Check if email is taken
 * @param {string} title - The user's email
 * @param {ObjectId} [excludeStageId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
tagSchema.statics.isStageTaken = async function (title, excludeStageId) {
  const tag = await this.findOne({ title, _id: { $ne: excludeStageId } });
  return !!tag;
};

/**
 * @typedef Stage
 */
const Tag = mongoose.model("tag", tagSchema);

module.exports = Tag;
