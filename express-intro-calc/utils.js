"use strict";

const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  let numsArr = [];
  for(let str of strNums){
    let num = Number(str);
    if(isNaN(num)){
      throw new BadRequestError(`${str} is not a number`);
    }
    numsArr.push(num);
  }

  return numsArr;
}


module.exports = { convertStrNums };