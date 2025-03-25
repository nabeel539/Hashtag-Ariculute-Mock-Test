import QuestionSet from "../models/questionsModel.js";
import Test from "../models/testModel.js";

// ✅ Fetch test sets
export const getTestSets = async (req, res) => {
  try {
    const { testId } = req.params;

    // Check if the test exists
    const test = await Test.findById(testId).populate("questionSets");
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    // Extract test sets
    let sets = test.questionSets.map((set, index) => ({
      setId: set._id,
      title: `Set ${index + 1}`,
      description: `Test Set ${index + 1}`,
      questions: set.questions.length,
      time: test.timeLimit,
      attempted: false, // We can update this later based on user history
    }));

    return res.status(200).json({
      success: true,
      data: {
        testId: test._id,
        testName: test.testName,
        description: test.description,
        sets,
      },
    });
  } catch (error) {
    console.error("Error fetching test sets:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Fetch test set details
export const getTestSet = async (req, res) => {
  try {
    const { testId, setId } = req.params;

    // Check if the test exists
    const test = await Test.findById(testId);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    // Check if the question set exists
    const questionSet = await QuestionSet.findById(setId);
    if (!questionSet) {
      return res
        .status(404)
        .json({ success: false, message: "Test Set not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        testId: test._id,
        testName: test.testName,
        setId: questionSet._id,
        setTitle: `Set ${questionSet.setNumber}`,
        description: `This is test set ${questionSet.setNumber}`,
        questions: questionSet.questions.length,
        timeLimit: test.timeLimit,
      },
    });
  } catch (error) {
    console.error("Error fetching test set:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Fetch questions for a specific test
export const getTestSetQuestions = async (req, res) => {
  try {
    const { testId, setId } = req.params;

    // Check if the test exists
    const test = await Test.findById(testId);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    // Check if the question set exists
    const questionSet = await QuestionSet.findById(setId);
    if (!questionSet) {
      return res
        .status(404)
        .json({ success: false, message: "Test Set not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        testId: test._id,
        testName: test.testName,
        setId: questionSet._id,
        setTitle: `Set ${questionSet.setNumber}`,
        description: `This is test set ${questionSet.setNumber}`,
        timeLimit: test.timeLimit,
        questions: questionSet.questions.map(({ _id, question, options }) => ({
          _id,
          question,
          options,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching test questions:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
