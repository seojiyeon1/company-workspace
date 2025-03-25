const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    isLoggedIn: {   // 동시 로그인 방지지
      type: Boolean,
      default: false,
    },
    isActive: {
      // 비밀번호가 5회 틀렸을 때 잠기도록 함.
      type: Boolean,
      default: true,
    },
    failedLoginAttempts: {
      // 로그인 시도 횟수
      type: Number,
      default: 0,
    },
    lastLoginAttempt: {
      type: Date,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;