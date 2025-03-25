import mongoose from "mongoose";

const questionSetSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  setNumber: { type: Number, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [
        {
          id: { type: String, required: true }, // Add this
          text: { type: String, required: true }, // Add this
        },
      ],
      answer: { type: String, required: true },
    },
  ],
});

const QuestionSet =
  mongoose.models.QuestionSet ||
  mongoose.model("QuestionSet", questionSetSchema);
export default QuestionSet;
