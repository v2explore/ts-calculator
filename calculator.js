var Calculator = /** @class */ (function () {
    function Calculator() {
        this.n1 = null;
        this.n2 = null;
        this.operator = null;
        this.result = null;
        // 声明所有按钮
        this.keys = [
            ['AC', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '='],
        ];
        this.createContainer();
        this.createOutput();
        this.createButtons();
        this.bindEvents();
    }
    // 声明创建按钮函数
    Calculator.prototype.createButton = function (text, container, className) {
        var button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        container.appendChild(button);
        return button;
    };
    Calculator.prototype.createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('calculator');
        document.body.appendChild(container);
        this.container = container;
    };
    Calculator.prototype.createOutput = function () {
        // 创建 output
        var output = document.createElement('div');
        output.classList.add('output');
        this.output = output;
        //创建 output内的span
        var span = document.createElement('span');
        span.textContent = '0';
        output.appendChild(span);
        this.container.appendChild(output);
        this.span = span;
    };
    Calculator.prototype.createButtons = function () {
        var _this = this;
        this.keys.forEach(function (textList) {
            var div = document.createElement('div');
            div.classList.add('row');
            textList.forEach(function (text) {
                _this.createButton(text, div, "button text-" + text);
            });
            _this.container.appendChild(div);
        });
    };
    Calculator.prototype.bindEvents = function () {
        var _this = this;
        this.container.addEventListener('click', function (e) {
            if (e.target instanceof HTMLButtonElement) {
                var text = e.target.textContent;
                _this.updateNumbersOrOperator(text);
            }
        });
    };
    Calculator.prototype.updateN = function (n, text) {
        if (this[n]) {
            this[n] += text;
        }
        else {
            this[n] = text;
        }
        this.span.textContent = this[n].toString();
    };
    Calculator.prototype.updateNumbers = function (text) {
        if (this.operator) {
            this.updateN('n2', text);
        }
        else {
            this.updateN('n1', text);
        }
    };
    Calculator.prototype.updateResult = function () {
        var result;
        var n1 = parseFloat(this.n1);
        var n2 = parseFloat(this.n2);
        switch (this.operator) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '×':
                result = n1 * n2;
                break;
            case '÷':
                result = n1 / n2;
                break;
        }
        this.n1 = null;
        this.n2 = null;
        this.operator = null;
        result = result.toPrecision(12).replace(/0+$/g, '').replace(/0+e/g, 'e');
        if (result.indexOf('.') === result.length - 1) {
            result = result.replace(/\./g, '');
        }
        if (n2 === 0) {
            result = '不是数字';
        }
        this.span.textContent = result;
        this.result = result;
    };
    Calculator.prototype.updateOperator = function (text) {
        if (this.n1 === null) {
            this.n1 = this.result;
        }
        this.operator = text;
    };
    Calculator.prototype.updateNumbersOrOperator = function (text) {
        if ('.0123456789'.indexOf(text) >= 0) {
            this.updateNumbers(text);
        }
        else if ('+-×÷'.indexOf(text) >= 0) {
            this.updateOperator(text);
        }
        else if (text === '=') {
            this.updateResult();
        }
        else if (text === 'AC') {
            this.span.textContent = '0';
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = '0';
        }
    };
    return Calculator;
}());
new Calculator();
