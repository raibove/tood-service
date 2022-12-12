import mongoose from "mongoose";

const ToDoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  arc: {
    type: Object,
    required: true,
  },
  angle: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Todo", ToDoListSchema);
