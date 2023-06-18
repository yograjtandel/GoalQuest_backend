const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rights: {
      type: [String],
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
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} name - The user's email
 * @param {ObjectId} [excludeRoleId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
roleSchema.statics.isRoleTaken = async function (name, excludeRoleId) {
  const role = await this.findOne({name, _id: {$ne: excludeRoleId}});
  return !!role;
};

/**
 * @typedef Role
 */
const Role = mongoose.model('role', roleSchema);

module.exports = Role;
