const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.methods.generatePasswordResetToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Assig the token to passwordResetToken field
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Update the passwordResetExpires and when to expire
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //! 10 minutes
  return resetToken;
};

//! Generate token for account verification
userSchema.methods.generateAccVerificationToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Assig the token to accountVerificationToken field
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Update the accountVerificationExpires and when to expire
  this.accountVerificationExpires = Date.now() + 10 * 60 * 1000; //! 10 minutes
  return resetToken;
};
//compiling schema

const User = mongoose.model("User", userSchema);

module.exports = User;
