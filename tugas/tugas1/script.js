document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    let currentValue = '0';
    let previousValue = null;
    let operator = null;
    let waitingForOperand = false;

    function updateDisplay() {
        display.textContent = currentValue;
    }

    function inputDigit(digit) {
        if (waitingForOperand) {
            currentValue = digit;
            waitingForOperand = false;
        } else {
            currentValue = currentValue === '0' ? digit : currentValue + digit;
        }
    }

    function inputDecimal() {
        if (waitingForOperand) {
            currentValue = '0.';
            waitingForOperand = false;
        } else if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    }

    function clear() {
        currentValue = '0';
        previousValue = null;
        operator = null;
        waitingForOperand = false;
    }

    function toggleSign() {
        currentValue = (parseFloat(currentValue) * -1).toString();
    }

    function inputPercent() {
        currentValue = (parseFloat(currentValue) / 100).toString();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentValue);

        if (operator && waitingForOperand) {
            operator = nextOperator;
            return;
        }

        if (previousValue === null) {
            previousValue = inputValue;
        } else if (operator) {
            const result = calculate(previousValue, inputValue, operator);
            currentValue = `${parseFloat(result.toFixed(7))}`;
            previousValue = result;
        }

        waitingForOperand = true;
        operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case 'add': return firstOperand + secondOperand;
            case 'subtract': return firstOperand - secondOperand;
            case 'multiply': return firstOperand * secondOperand;
            case 'divide': return firstOperand / secondOperand;
            default: return secondOperand;
        }
    }

    buttons.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) return;

        if (target.classList.contains('number')) {
            inputDigit(target.dataset.num);
            updateDisplay();
        }

        if (target.classList.contains('function')) {
            switch (target.dataset.action) {
                case 'clear':
                    clear();
                    break;
                case 'toggle-sign':
                    toggleSign();
                    break;
                case 'percentage':
                    inputPercent();
                    break;
            }
            updateDisplay();
        }

        if (target.classList.contains('operator')) {
            switch (target.dataset.action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    handleOperator(target.dataset.action);
                    break;
                case 'calculate':
                    if (operator && previousValue !== null) {
                        const result = calculate(previousValue, parseFloat(currentValue), operator);
                        currentValue = `${parseFloat(result.toFixed(7))}`;
                        previousValue = null;
                        operator = null;
                        waitingForOperand = true;
                    }
                    break;
            }
            updateDisplay();
        }
    });
});