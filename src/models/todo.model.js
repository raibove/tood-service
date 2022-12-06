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
});

export default mongoose.model("Todo", ToDoListSchema);
