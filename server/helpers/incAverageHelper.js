const { isNumber } = require('lodash');

const getIncAvg = (numEntries, currentAvg, newValue) => {
  // Short circuit any default values we may have given
  if (numEntries === 0 || !isNumber(currentAvg)) return newValue;
  return currentAvg + (newValue - currentAvg) / numEntries;
};

const getObjIncAvg = (numEntries, existingObj, newObj) => {
  console.log(
    `numEntries: ${numEntries}, ${JSON.stringify(existingObj)}, ${newObj}`
  );
  if (numEntries === 0) return { ...newObj };
  const retQualities = {};
  Object.entries(newObj).forEach(([key, newVal]) => {
    retQualities[key] = getIncAvg(numEntries, existingObj[key], newVal);
  });
  return retQualities;
};

module.exports = {
  getIncAvg,
  getObjIncAvg,
};
