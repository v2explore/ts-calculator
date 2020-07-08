class Calculator {
  public container: HTMLDivElement;
  private output: HTMLDivElement;
  private span: HTMLSpanElement;

  public n1: string = null;
  public n2: string = null;
  public operator: string = null;
  public result: string = null;

  // 声明所有按钮
  public keys: Array<Array<string>> = [
    ['AC', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];
  constructor() {
    this.createContainer();
    this.createOutput();
    this.createButtons();
    this.bindEvents();
  }
  // 声明创建按钮函数
  createButton(text: string, container: HTMLElement, className?: string): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = text;
    button.className = className;
    container.appendChild(button);
    return button;
  }
  createContainer(): void {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('calculator');
    document.body.appendChild(container);
    this.container = container;
  }
  createOutput(): void {
    // 创建 output
    const output: HTMLDivElement = document.createElement('div');
    output.classList.add('output');
    this.output = output;
    //创建 output内的span
    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = '0';
    output.appendChild(span);
    this.container.appendChild(output);
    this.span = span;
  }
  createButtons(): void {
    this.keys.forEach((textList: Array<string>) => {
      const div: HTMLDivElement = document.createElement('div');
      div.classList.add('row');
      textList.forEach((text: string) => {
        this.createButton(text, div, `button text-${text}`);
      });
      this.container.appendChild(div);
    });
  }
  bindEvents(): void {
    this.container.addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement) {
        const text = e.target.textContent;
        this.updateNumbersOrOperator(text);
      }
    });
  }
  updateN(n:string, text: string): void {
    if (this[n]) {
      this[n] += text;
    } else {
      this[n] = text;
    }
    this.span.textContent = this[n].toString();
  }
  updateNumbers(text: string): void {
    if (this.operator) {
      this.updateN('n2', text);
    } else {
      this.updateN('n1', text);
    }
  }
  updateResult(): void {
    let result;
    const n1: number = parseFloat(this.n1);
    const n2: number = parseFloat(this.n2);
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
  }
  updateOperator(text: string): void {
    if (this.n1 === null) {
      this.n1 = this.result;
    }
    this.operator = text;
  }
  updateNumbersOrOperator(text: string): void {
    if ('.0123456789'.indexOf(text) >= 0) {
      this.updateNumbers(text);
    } else if ('+-×÷'.indexOf(text) >= 0) {
      this.updateOperator(text);
    } else if (text === '=') {
      this.updateResult();
    } else if (text === 'AC') {
      this.span.textContent = '0';
      this.n1 = null;
      this.n2 = null;
      this.operator = null;
      this.result = '0';
    }
  }
}

new Calculator();
