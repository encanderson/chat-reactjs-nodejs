/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("@src/database/mongodb");

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true   
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

UserSchema.set("versionKey", false);

export const Users = mongoose.model("Users", UserSchema);