/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("@src/database/mongodb");

const consentsSchema = mongoose.Schema({
  _id: false,
  privacy: {
    type: Boolean,
    require: true,
  },
  terms: {
    type: Boolean,
    require: true
  }
});

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    require: true
  },
  consents: consentsSchema,
  email: {
    type: String,
    require: true
  },
  name: {
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
  },
  picture: {
    type: String,
    require: false
  }
});

UserSchema.set("versionKey", false);

export const Users = mongoose.model("Users", UserSchema);