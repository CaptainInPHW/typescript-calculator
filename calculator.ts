class Calculator {
  constructor(private rootElement: HTMLElement) {}
  private readonly KEYS: Array<Array<number | string>> = [
    ['AC', '÷'],
    [7, 8, 9, '×'],
    [4, 5, 6, '﹣'],
    [1, 2, 3, '﹢'],
    [0, '.', '=']
  ];
  private readonly NUMBERS: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private readonly OPERATORS: Array<string> = ['÷', '×', '﹢', '﹣'];
  private readonly DECIMAL_POINT: string = '.';
  private readonly EXECUTE_FLAG: string = '=';
  private readonly CLEAR_FLAG: string = 'AC';
  private calculator: HTMLElement;
  private displayContainer: HTMLElement;
  private resultElement: HTMLElement;
  private x: string = '';
  private y: string = '';
  private operator: string = '';
  private result: string = '';

  public create(): void {
    this.createCalculatorContainer();
    this.createDecorator();
    this.createResultDisplayContainer();
    this.createResultDisplayElement();
    this.createButtons();
    this.addEventListener();
  }
  private createCalculatorContainer(): void {
    this.calculator = this.createElement('div');
    this.addClass(this.calculator, 'calculator');
    this.rootElement.prepend(this.calculator);
  }
  private createDecorator(): void {
    const dot: HTMLElement = this.createElement('div');
    const container: HTMLElement = this.createElement('div');
    this.addClass(dot, 'dot');
    this.addClass(container, 'decorator');
    container.appendChild(dot);
    this.calculator.appendChild(container);
  }
  private createResultDisplayContainer(): void {
    this.displayContainer = this.createElement('div');
    this.addClass(this.displayContainer, 'display');
    this.calculator.appendChild(this.displayContainer);
  }
  private createResultDisplayElement(): void {
    this.resultElement = this.createElement('div');
    this.addClass(this.resultElement, 'result');
    this.resultElement.textContent = '0';
    this.displayContainer.appendChild(this.resultElement);
  }
  private createButtons(): void {
    this.KEYS.forEach((rowKeys: Array<string | number>) => {
      const row: HTMLElement = this.createElement('div');
      this.addClass(row, 'row');
      this.calculator.appendChild(row);
      rowKeys.forEach((key: string | number) => {
        const button: HTMLElement = this.createElement('div');
        this.addClass(button, 'button');
        button.textContent = `${key}`;
        row.appendChild(button);
      });
    });
  }
  private addEventListener(): void {
    this.calculator.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const { className } = target;
      if (className === 'button') {
        const text = target.textContent;
        if (this.NUMBERS.indexOf(Number(text)) > -1) {
          if (!this.operator) {
            this.x += text;
            this.updateResult(this.x);
          } else {
            this.y += text;
            this.updateResult(this.y);
          }
        } else if (this.OPERATORS.indexOf(text) > -1) {
          this.operator = text;
        } else if (this.EXECUTE_FLAG === text) {
          this.result = this.excuteAlgorithm();
          this.updateResult(this.result);
        } else if (this.CLEAR_FLAG === text) {
          this.x = '';
          this.y = '';
          this.operator = '';
          this.result = '';
          this.updateResult('0');
        }
      }
    });
  }
  private updateResult(result: string): void {
    this.resultElement.textContent = result;
  }
  private excuteAlgorithm(): string {
    switch (this.operator) {
      case '﹢':
        return `${Number(this.x) + Number(this.y)}`;
      case '-':
        return `${Number(this.x) - Number(this.y)}`;
      case '×':
        return `${Number(this.x) * Number(this.y)}`;
      case '÷':
        return `${Number(this.x) / Number(this.y)}`;
    }
  }
  private createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }
  private addClass(target: HTMLElement, className: string): void {
    target.classList.add(className);
  }
}
