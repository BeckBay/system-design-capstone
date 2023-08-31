const express = require("express");
const qaRouter = express.Router();
const { queryFuncObj, queryDb } = require("../Models/qa");
const client = require("../../databases/qa_db");
const { formatTime, nestObj } = require("../helpers/qa_helpers");

qaRouter.get("/questions", (req, res) => {
  // console.log('received request');
  let questions;
  let answers;
  let photos;
  // Product ID => Question ID(s) => Answer ID(s) => Photos
  let getParallelQueries = () => {
    return new Promise((resolve, reject) => {
      const getAnswers = queryDb([1], queryFuncObj.getDistinctQuestionIds)
        .then((res) => res.rows.map((obj) => obj.id))
        .then((res) => queryDb(res, queryFuncObj.getAnswers))
        .then((res) => answers = res.rows)
        .then(() => answers.map((obj) => formatTime(obj, 'date')))
        .then(() => answers.map((obj) => obj.id))
        .then((res) => queryDb(res, queryFuncObj.getAnswerPhotos))
        .then((res) => photos = res.rows)
        .catch((err) => console.log('error getting answers from db - ', err))

      // get questions async
      const getQuestions = queryDb([1], queryFuncObj.getQuestions)
        .then((res) => questions = res.rows)
        .then(() => questions.map((obj) => formatTime(obj, 'question_date')))
        .catch((err) => console.log('error getting questions from db'));

      Promise.all([getAnswers, getQuestions])
        .then(() => resolve(questions, answers, photos))
        .catch((err) => reject(err));
    });
  }

  getParallelQueries()
    // .then(() => console.log({questions, answers, photos}))
    .then(() => nestObj(answers, photos, 'id', 'answer_id', 'photos'))
    .then((res) => nestObj(questions, res, 'question_id', 'question_id', 'answers'))
    .then((data) => res.status(200).send(data));
});

module.exports = qaRouter;