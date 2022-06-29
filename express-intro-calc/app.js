"use strict";
/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMean, findMode, findMedian } = require("./stats");
const { convertStrNums } = require("./utils");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean/:nums', function (req, res){
  let numsStrArr = req.params.nums.split(",");

  const mean = findMean(convertStrNums(numsStrArr));
  return res.json({response: {
    operation : "mean",
    value: mean,
  }});
});

/** Throws Bad Request Error if not parameters are passed to "meadn" */
app.get('/mean', function (req, res){
    throw new BadRequestError("Numbers are required");
});


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get('/median/:nums', function (req, res){
  let numsStrArr = req.params.nums.split(",");

  const median = findMedian(convertStrNums(numsStrArr));
  return res.json({response: {
    operation : "median",
    value: median,
  }});
});

/** Throws Bad Request Error if not parameters are passed to "median" */
app.get('/median', function (req, res){
  throw new BadRequestError("Numbers are required");
});


/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get('/mode/:nums', function (req, res){
  let numsStrArr = req.params.nums.split(",");

  const mode = findMode(convertStrNums(numsStrArr));
  return res.json({response: {
    operation : "mode",
    value: mode,
  }});
});

/** Throws Bad Request Error if not parameters are passed to "mode" */
app.get('/mode', function (req, res){
  throw new BadRequestError("Numbers are required");
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;