const input = document.querySelector('.form-group');
const div = document.querySelector('.empty');
let stringValues = [];
let numberValues = [];

input.addEventListener('submit', function(e) {
  e.preventDefault();

  if (e.target.elements[0].value) {
    stringValues = e.target.elements[0].value.split(' ');
    numberValues = stringValues.map(function(value) {
      return parseInt(value);
    });
    console.log(stringValues);
    console.log(numberValues);

    displayResults(meanMedianMode(numberValues));
  }
});

function displayResults(obj) {
  let isMode = true;
  if (obj.mode.length === 0) isMode = false;
  const html = `
    <textarea class="form-control">
      The mean is ${obj.mean}, the median is ${obj.median}, and the mode is ${
    isMode ? obj.mode : 'none'
  }.
    </textarea>
  `;

  div.insertAdjacentHTML('beforeend', html);
}

function meanMedianMode(array) {
  return {
    mean: getMean(array),
    median: getMedian(array),
    mode: getMode(array)
  };
}

function getMean(array) {
  let sum = 0;
  array.forEach(num => {
    sum += num;
  });
  return sum / array.length;
}

function getMedian(array) {
  array.sort(function(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  let median;

  if (array.length % 2 !== 0) {
    median = array[Math.floor(array.length / 2)];
  } else {
    let mid1 = array[array.length / 2 - 1];
    let mid2 = array[array.length / 2];
    median = (mid1 + mid2) / 2;
  }

  return median;
}

function getMode(array) {
  let modeObj = {};

  array.forEach(num => {
    if (!modeObj[num]) modeObj[num] = 0;
    modeObj[num]++;
  });

  let maxFrequency = 0;
  let modes = [];
  for (let num in modeObj) {
    if (modeObj[num] > maxFrequency) {
      modes = [num];
      maxFrequency = modeObj[num];
    } else if (modeObj[num] === maxFrequency) modes.push(num);
  }

  if (modes.length === Object.keys(modeObj).length) {
    modes = [];
  }

  return modes;
}
