// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
function validateCred(array) {
  let counter = 0;
  let sum = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    let checkDigit = array[i];
    //console.log('i: ' + i + ' / CheckDigit: ' + checkDigit);
    if (counter % 2 == 1) {
      checkDigit = checkDigit * 2;
      if (checkDigit > 9) {
        checkDigit = checkDigit - 9;
      }
      //console.log('Digit: ' + checkDigit);
    }
    counter++;
    sum = sum + checkDigit;
    //console.log("Sum: " + sum);
  }
  //console.log(sum);
  if (sum % 10 == 0) {
      return true;
  }
  return false;
}

function findInvalidCards(nestedArray) {
  let newArray = [];
  for (array of nestedArray) {
    if (!validateCred(array)) {
      newArray.push(array);
    }
  }
  return newArray;
}

function idCompany(array) {
  let i1 = array[0];
  switch(i1) {
    case 3: return 'Amex (American Express)';
    case 4: return 'Visa';
    case 5: return 'Mastercard';
    case 6: return 'Discover';
    default: return 'Company not found';
  }
}

function idInvalidCardCompanies(nestedArray) {
  let newArray = [];
  for (array of nestedArray) {
    let company = idCompany(array);
    if (!newArray.includes(company)) {
        newArray.push(company);
    }
  }
  //newArray = new Set(newArray);
  return newArray;
}

function charToInt(array) {
  for (i in array) {
    item = parseInt(array[i]);
    array[i] = item;
  }
}

function stringToArray(string) {
  let array = string.split('');
  charToInt(array);
  return array;
}

function validOrInvalid(nestedArray) {
  for (array of nestedArray) {
    console.log(array + ': ' + validateCred(array));
  }
}

validOrInvalid(batch);
//console.log(validateCred(valid1));
invalidCards = (findInvalidCards(batch));
console.log(invalidCards);
//console.log(idCompany(invalid4));
companies = idInvalidCardCompanies(invalidCards);
console.log(companies);

fakeVisa1 = stringToArray('4870685128047336');
fakeMC1 = stringToArray('5259284528322024');
fakeAmex1 = stringToArray('345675563826042');
realFakes = [fakeVisa1, fakeMC1, fakeAmex1];
validOrInvalid(realFakes);
