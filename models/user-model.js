const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// instance methods
userSchema.methods.isStudent = function () {
  return this.role === "student";
};

userSchema.methods.isInstructor = function () {
  return this.role === "instructor";
};

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    throw new Error("比對密碼時發生錯誤: " + e.message);
  }
};

// mongoose middleware
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    try {
      const hashValue = await bcrypt.hash(this.password, 10);
      this.password = hashValue;
    } catch (e) {
      return next(new Error("密碼加密時發生錯誤: " + e.message));
    }
  }
  next();
});

// 添加到 userSchema 中
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password; // 永遠不返回密碼
  return user;
};

module.exports = mongoose.model("User", userSchema);
