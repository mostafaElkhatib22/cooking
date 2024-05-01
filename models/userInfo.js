const { Schema, default: mongoose } = require("mongoose");

const UserInfoSchema = new Schema(
  {
    email:{type:String,required:true},
    phone: { type: String },
    city: { type: String },
    streetAddress: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const userInfo =
  mongoose.models?.UserInfo || mongoose.model("UserInfo", UserInfoSchema);

