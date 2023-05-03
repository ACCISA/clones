const mangoose = require("mongoose");
const { Schema } = mangoose;

const UserSchema = new Schema({
  username: {type:String, unique:true},
  password: String,
},{timestamps:true});

const UserModel = mangoose.model("User", UserSchema);

module.exports = UserModel;
