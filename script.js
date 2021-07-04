function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

function round(a) {
    return Math.round(a * 100000000000) / 100000000000;
}

let operationActive = false;
let reset = true;
let number1 = null;
let number2 = null;
let result = null;
let operation = null;
let previousOperation = null;
let chained = false;
let numberInput = false;
const display = document.querySelector('.display-numbers');
let displayed = display.textContent = '0';
const opAdd = document.querySelector('#op-add');
const opSub = document.querySelector('#op-sub');
const opMul = document.querySelector('#op-mul');
const opDiv = document.querySelector('#op-div');

function numberButton(e) {
    if (reset) {
        displayed = '';
        reset = false;
    }
    if (displayed.length < 12 && !(displayed.length === 11 && e.target.value === '00')) {
    if (!operationActive) {
        displayed += e.target.value;
    } else {
        displayed = '';
        displayed += e.target.value;
        operationActive = false;
    }
    }
    if (!chained) {
        number1 = null;
        result = null;
    }
    numberInput = true;
    display.textContent = displayed;
}

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(function(item) {
    item.addEventListener('click', function(e) {
        numberButton(e);
    });
});

function operationButton(e) {
    if (number1 === null) {
    number1 = Number(displayed);
    }
    if (result === 'Error') {
        clearB();
    }
    previousOperation = operation;
    operation = e.target.value;
    operationActive = true;
    if (operation === 'add') {
        opAdd.style.color = 'black';
        opSub.style.color = 'transparent';
        opMul.style.color = 'transparent';
        opDiv.style.color = 'transparent';
    } else if (operation === 'sub') {
        opAdd.style.color = 'transparent';
        opSub.style.color = 'black';
        opMul.style.color = 'transparent';
        opDiv.style.color = 'transparent';
    } else if (operation === 'mul') {
        opAdd.style.color = 'transparent';
        opSub.style.color = 'transparent';
        opMul.style.color = 'black';
        opDiv.style.color = 'transparent';
    } else if (operation === 'div') {
        opAdd.style.color = 'transparent';
        opSub.style.color = 'transparent';
        opMul.style.color = 'transparent';
        opDiv.style.color = 'black';
    }
    if (chained && numberInput) {
        if (result) {
            number1 = Number(result);
        }
        number2 = Number(displayed);
        if (previousOperation === 'add') {
            result = add(number1, number2);
        } else if (previousOperation === 'sub') {
            result = subtract(number1, number2);
        } else if (previousOperation === 'mul') {
            result = multiply(number1, number2);
        } else if (previousOperation === 'div') {
            result = divide(number1, number2);
        }
        result = result.toString();
        toTwelve();
        display.textContent = result;
    }
    chained = true;
    numberInput = false;
}

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(function(item) {
    item.addEventListener('click', function(e) {
        operationButton(e);
    });
});

function equals() {
    if (result) {
        number1 = Number(result);
    }
    number2 = Number(displayed);
    if (operation === 'add') {
        result = add(number1, number2);
    } else if (operation === 'sub') {
        result = subtract(number1, number2);
    } else if (operation === 'mul') {
        result = multiply(number1, number2);
    } else if (operation === 'div') {
        result = divide(number1, number2);
    }
    result = result.toString();
    toTwelve();
    displayed = result;
    display.textContent = result;
    operationActive = true;
    chained = false;
    opAdd.style.color = 'transparent';
    opSub.style.color = 'transparent';
    opMul.style.color = 'transparent';
    opDiv.style.color = 'transparent';
}

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', function(e) {
    equals(e);
}); 

function deleteB() {
    displayed = displayed.slice(0, displayed.length-1);
    if (operationActive) {
        result = result.slice(0, result.length-1);
    }
    if (!displayed) {
        display.textContent = '0';
    } else {
        display.textContent = displayed;
    }
}

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', function(e) {
    deleteB(e);
});

function clearB() {
    operationActive = false;
    reset = true;
    number1 = null;
    number2 = null;
    result = null;
    operation = null;
    chained = false;
    numberInput = false;
    opAdd.style.color = 'transparent';
    opSub.style.color = 'transparent';
    opMul.style.color = 'transparent';
    opDiv.style.color = 'transparent';
    displayed = '0';
    display.textContent = '0';
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function(e) {
    clearB(e);
});

function toTwelve() {
    if (result.length > 12) {
    if (result.search(/[.]/) !== -1) {
        result = result.slice(0, 12);
    } else {
        result = result.slice(0, 6) + '×10^' + (result.length-6);
    }
    }
}