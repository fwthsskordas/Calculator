const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //   const displayValue = calculatorDisplay.textContent;
  //   calculatorDisplay.textContent =
  //   displayValue === "0" ? number : displayValue + number;
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (secondNumber) => secondNumber,
};

function userOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = currentValue;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operator](firstValue, currentValue);
    firstValue = calculation;
    calculatorDisplay.textContent = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

//events
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => userOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);
