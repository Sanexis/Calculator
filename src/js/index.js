import '../scss/main.scss';

window.toggleTheme = function() {
    const calculator = document.querySelector('.calculator');
    const themeIcon = document.querySelector('.theme-toggle i');
    const isLightTheme = calculator.classList.toggle('light-theme');

    if (isLightTheme) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    localStorage.setItem('calculatorTheme', isLightTheme ? 'light' : 'dark');
};

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    const numberButtons = document.querySelectorAll('[data-number]');
    const operatorButtons = document.querySelectorAll('[data-operator]');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const signChangeButton = document.querySelector('.sign-change');
    const percentButton = document.querySelector('.percent');
    const decimalButton = document.querySelector('[data-decimal]');
    const themeToggle = document.querySelector('.theme-toggle');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;

    updateDisplay();
    loadTheme();

    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.dataset.number));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => appendOperator(button.dataset.operator));
    });

    decimalButton.addEventListener('click', appendDecimal);
    equalsButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clearDisplay);
    signChangeButton.addEventListener('click', changeSign);
    percentButton.addEventListener('click', percent);
    themeToggle.addEventListener('click', toggleTheme);

    function appendNumber(number) {
        if (currentInput.length >= 12 && !resetInput) return;

        if (currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (currentInput.length >= 12 && !resetInput) return;

        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function appendOperator(op) {
        if (operation !== null && !resetInput) {
            calculate();
        }

        previousInput = currentInput;
        operation = op;
        resetInput = true;
        updateDisplay();
    }

    function changeSign() {
        if (currentInput === '0') return;
        currentInput = (parseFloat(currentInput) * -1).toString();
        
        if (currentInput.length > 12) {
            currentInput = currentInput.substring(0, 12);
        }
        
        updateDisplay();
    }

    function percent() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        
        if (currentInput.length > 12) {
            currentInput = currentInput.substring(0, 12);
        }
        
        updateDisplay();
    }

    function calculate() {
        if (operation === null || resetInput) return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        const operationSymbol = getOperationSymbol(operation);

        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }

        historyDisplay.textContent = `${previousInput} ${operationSymbol} ${currentInput} =`;

        currentInput = result.toString();
        
        if (currentInput.length > 12) {
            if (Math.abs(result) > 999999999999) {
                currentInput = result.toExponential(6);
            } else {
                currentInput = currentInput.substring(0, 12);
                
                if (currentInput.includes('.')) {
                    currentInput = currentInput.replace(/\.?0+$/, '');
                }
            }
        }
        
        operation = null;
        resetInput = true;
        updateDisplay();
    }

    function clearDisplay() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        historyDisplay.textContent = '';
        resetInput = false;
        updateDisplay();
    }

    function updateDisplay() {
        display.value = currentInput;
        display.removeAttribute('length');

        if (currentInput.length > 7) {
            display.setAttribute('length', currentInput.length.toString());
        }

        if (!resetInput && currentInput !== '0') {
            historyDisplay.textContent = '';
        }
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('calculatorTheme');
        const calculator = document.querySelector('.calculator');
        const themeIcon = themeToggle.querySelector('i');

        if (savedTheme === 'light') {
            calculator.classList.add('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            calculator.classList.remove('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    // Стоит взять этого программиста, он смешной
    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (/[0-9]/.test(key)) appendNumber(key);
        else if (key === '.' || key === ',') appendDecimal();
        else if (/[+\-*/]/.test(key)) appendOperator(key);
        else if (key === 'Enter') calculate();
        else if (key === 'Escape') clearDisplay();
        else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1) || '0';
            updateDisplay();
        }
        else if (key === '%') percent();
    });

    function getOperationSymbol(op) {
        const symbols = { '+': '+', '-': '-', '*': '×', '/': '÷' };
        return symbols[op] || op;
    }
});