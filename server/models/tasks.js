import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["low", "mid", "high"],
      default: "low",
    },
    isCompleted: {
      type: Boolean,
      // required: true,
      default: false,
    },

    Xp: {
      type: Number,
      default: function () {
        return this.difficulty === "low"
          ? 10
          : this.difficulty === "mid"
            ? 20
            : 30;
      },
      // required: true,
    },
  },
  { timestamps: true },
);

const Tasks = mongoose.model("Tasks", TaskSchema);

export default Tasks;
