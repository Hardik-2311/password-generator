// by custom attribue
const slider=document.querySelector("[data-slider]");
const length=document.querySelector("[data-passlength]");
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


let password="";
let passlength=15;
let checkCount=1;

// first display of password strength will be grey
handleslider()
setIndicator("#ccc");

function handleslider(){
    slider.value=passlength;
    length.innerText=passlength;
}

function setIndicator(color){
    //setting stremgth color
    indicator.style.background =color;
    // shadow behind pass stremgth
}


// function for random integers

function randInt(min,max){
    return Math.floor((Math.random()) * (max-min)) + min;
}


// gunction to genrate numbers for password

function randNum(){
   return randInt(0,9);
}
// function for lower case integers
function randLower(){
    return String.fromCharCode(randInt(97,123));
}

// function for uppercase

function randUpper(){
    return String.fromCharCode(randInt(65,91));
}

// function for random symbols
function randSymbol() {
    const randNum = getRndInteger(0, symbols.length);
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
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}


// now to manage when we copy the password uske liye ek api hai voh use krenge

async function copyContent(){

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    } catch (e) {
        copyMsg.innerText="Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
   
}
slider.addEventListener('input', (e) => {
    passlength = e.target.value;
    handleslider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})