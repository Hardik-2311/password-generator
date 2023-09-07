// by custom attribue
const slider = document.querySelector("[data-slider]");
const length = document.querySelector("[data-passlength]");
const passwordDisplay = document.querySelector("[data-password]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyimg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passlength = 10;
let checkCount = 0;

// first display of password strength will be grey
handleslider();
setIndicator("#ccc");

function handleslider() {
  slider.value = passlength;
  length.innerText = passlength;
  const min = slider.min;
  const max = slider.max;
  slider.style.backgroundSize = ( (passlength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
  //setting stremgth color
  indicator.style.background = color;
  // shadow behind pass stremgth
}

// function for random integers

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// gunction to genrate numbers for password

function randNum() {
  return randInt(0, 9);
}
// function for lower case integers
function randLower() {
  return String.fromCharCode(randInt(97, 123));
}

// function for uppercase

function randUpper() {
  return String.fromCharCode(randInt(65, 91));
}

// function for random symbols
function randSymbol() {
  const randNum = randInt(0, symbols.length);
  return symbols.charAt(randNum);
}

// calculate strength for password

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passlength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passlength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

// now to manage when we copy the password uske liye ek api hai voh use krenge

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  //to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition
  if (passlength < checkCount) {
    passlength = checkCount;
    handleslider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

slider.addEventListener("input", (e) => {
  passlength = e.target.value;
  handleslider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});

generateBtn.addEventListener("click", () => {
  //none of the checkbox are selected
   console.log("button clicked")
  if (checkCount == 0) return;

  if (passlength < checkCount) {
    passlength = checkCount;
    handleslider();
  }

  password = "";
  //    check kiya kaun kaun se checkboxes ticked hain
  let funcArr = [];

  if (uppercaseCheck.checked) funcArr.push(randUpper);

  if (lowercaseCheck.checked) funcArr.push(randLower);

  if (numbersCheck.checked) funcArr.push(randNum);

  if (symbolsCheck.checked) funcArr.push(randSymbol);

  //compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  //   remaining password lwngth
  for (let i = 0; i < passlength - funcArr.length; i++) {
    let randIndex = randInt(0, funcArr.length);
    password += funcArr[randIndex]();
    // the problem with this password right now is that first letter will always be uppercasse and vice versa
  }
  //lets shuffle the password
  password = shufflePassword(Array.from(password));
  //   now to show in the input area
  passwordDisplay.value = password;

  //   calculate strength
  calcStrength();
});
