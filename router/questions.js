const express = require("express");
const router = express.Router();
const Questions = require("../models/questionSchema.js");
// const Results = require("../models/resultSchema.js");
const questions = require("./database/data.js");
const answers = require("./database/data.js");

// import Questions from "";
// import Results from "";
// import questions, { answers } from ".";

// export async function getQuestions(req, res) {
//   try {
//     const q = await Questions.find();
//     res.json(q);
//   } catch (error) {
//     res.json({ error });
//   }
// }

router.get("/getQuestions", async (req, res) => {
  try {
    Questions.insertMany({ questions, answers }, function (err, data) {
      res.json({ msg: "Data Saved Successfully...!" });
    });
  } catch (error) {
    res.json({ error });
  }
});

// /** insert all questinos */
// export async function insertQuestions(req, res) {
//   try {
//     Questions.insertMany({ questions, answers }, function (err, data) {
//       res.json({ msg: "Data Saved Successfully...!" });
//     });
//   } catch (error) {
//     res.json({ error });
//   }
// }

// /** Delete all Questions */
// export async function dropQuestions(req, res) {
//   try {
//     await Questions.deleteMany();
//     res.json({ msg: "Questions Deleted Successfully...!" });
//   } catch (error) {
//     res.json({ error });
//   }
// }
module.exports = router;
