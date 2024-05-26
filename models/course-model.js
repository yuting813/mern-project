import mongoose, { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: _Schema.Types.ObjectId, //primary key
    ref: "User",
  },
  students: {
    type: [String],
    default: [],
  },
  img: {
    type: [String],
  },
});

export default model("Course", courseSchema);
