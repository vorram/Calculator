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
let decimals = null;
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
    if ((displayed.length < 12 && !(displayed.length === 11 && e.target.value === '00')) || (operationActive && displayed.length === 12)) {
    if (!operationActive) {
        displayed += e.target.value;
    } else {
        displayed = '';
        displayed += e.target.value;
        operationActive = false;
    }
    if (e.target.value === '.') {
        decimals++;
        if (decimals > 1) {
            displayed = displayed.slice(0, -1);
        }
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
    decimals = null;
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
    decimals = null;
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
    if (displayed.charAt(displayed.length-1) === '.') {
        decimals = null;
    }
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
    decimals = null;
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
        if (result.charAt(0) === '-') {
            if (result.search(/[.]/) === -1) {
                result = '-' + result.charAt(1) + '.' + result.slice(2,7) + 'e+' + (result.length-1);
            } else {
                if (result.search(/[e]/) !== -1) {
                    result = result.slice(0, 7) + result.slice(-4);
                } else {
                    if (result.search(/[.]/) > 10) {
                        result = '-' + result.charAt(1) + '.' + result.slice(2,7) + 'e+' + (result.search(/[.]/)-1);
                    } else {
                        result = result.slice(0, 11);
                    }
                }
            }
        } else {
            if (result.search(/[.]/) === -1) {
                result = result.charAt(0) + '.' + result.slice(1,7) + 'e+' + (result.length-1);
            } else {
                if (result.search(/[e]/) !== -1) {
                    result = result.slice(0, 8) + result.slice(-4);
                } else {
                    if (result.search(/[.]/) > 10) {
                        result = result.charAt(0) + '.' + result.slice(1,7) + 'e+' + (result.search(/[.]/)-1);
                    } else {
                        result = result.slice(0, 11);
                    }
                }
            }
        }
    }
}

//Keyboard mapping

document.addEventListener('keydown', function(e) {
    console.log(e.code);
    if (e.code === 'Digit1') {
        e.target.value = '1';
        numberButton(e);
    } 
    if (e.code === 'Digit2') {
        e.target.value = '2';
        numberButton(e);
    }
    if (e.code === 'Digit3') {
        e.target.value = '3';
        numberButton(e);
    }
    if (e.code === 'Digit4') {
        e.target.value = '4';
        numberButton(e);
    }
    if (e.code === 'Digit5') {
        e.target.value = '5';
        numberButton(e);
    }
    if (e.code === 'Digit6') {
        e.target.value = '6';
        numberButton(e);
    }
    if (e.code === 'Digit7') {
        e.target.value = '7';
        numberButton(e);
    }
    if (e.key === '8') {
        e.target.value = '8';
        numberButton(e);
    }
    if (e.code === 'Digit9') {
        e.target.value = '9';
        numberButton(e);
    }
    if (e.code === 'Digit0') {
        e.target.value = '0';
        numberButton(e);
    }
    if (e.code === 'Period') {
        e.target.value = '.';
        numberButton(e);
    }
    if (e.key === 'Enter') {
        equals(e);
    }
    if (e.code === 'Backspace') {
        deleteB(e);
    }
    if (e.code === 'Delete') {
        clearB(e);
    }
    if (e.code === 'Minus') {
        e.target.value = 'sub';
        operationButton(e);
    }
    if (e.key === '*') {
        e.target.value = 'mul';
        operationButton(e);
    }
    if (e.key === '+') {
        e.target.value = 'add';
        operationButton(e);
    }
    if (e.code === 'Slash') {
        e.target.value = 'div';
        operationButton(e);
    }
}); 