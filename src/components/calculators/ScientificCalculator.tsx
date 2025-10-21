import React, { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || '0';
      const newValue = calculate(currentValue, display, operation);

      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
      
      const calculation = `${currentValue} ${operation} ${display} = ${newValue}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, operation, previousValue]);

  const calculate = (firstValue: string, secondValue: string, operation: string): number => {
    const prev = parseFloat(firstValue);
    const current = parseFloat(secondValue);

    switch (operation) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×': return prev * current;
      case '÷': return current !== 0 ? prev / current : 0;
      case '^': return Math.pow(prev, current);
      default: return current;
    }
  };

  const performFunction = useCallback((func: string) => {
    try {
      const value = parseFloat(display);
      let result: number;
      
      switch (func) {
        case 'sin':
          result = Math.sin(isRadians ? value : (value * Math.PI / 180));
          break;
        case 'cos':
          result = Math.cos(isRadians ? value : (value * Math.PI / 180));
          break;
        case 'tan':
          result = Math.tan(isRadians ? value : (value * Math.PI / 180));
          break;
        case 'asin':
          result = Math.asin(value);
          if (!isRadians) result = result * 180 / Math.PI;
          break;
        case 'acos':
          result = Math.acos(value);
          if (!isRadians) result = result * 180 / Math.PI;
          break;
        case 'atan':
          result = Math.atan(value);
          if (!isRadians) result = result * 180 / Math.PI;
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'x²':
          result = value * value;
          break;
        case '1/x':
          result = value !== 0 ? 1 / value : 0;
          break;
        case 'x!':
          result = factorial(Math.floor(value));
          break;
        case '±':
          result = -value;
          break;
        default:
          return;
      }
      
      const calculation = `${func}(${display}) = ${result}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
      setDisplay(String(result));
      setWaitingForOperand(true);
    } catch (error) {
      setDisplay('Error');
    }
  }, [display, isRadians]);

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const insertConstant = useCallback((constant: string) => {
    let value: number;
    switch (constant) {
      case 'π': value = Math.PI; break;
      case 'e': value = Math.E; break;
      default: return;
    }
    setDisplay(String(value));
    setWaitingForOperand(true);
  }, []);

  const memoryOperation = useCallback((op: string) => {
    const value = parseFloat(display);
    switch (op) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + value);
        break;
      case 'M-':
        setMemory(memory - value);
        break;
      case 'MS':
        setMemory(value);
        break;
    }
  }, [display, memory]);

  const Button: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`h-12 rounded-lg font-medium transition-colors duration-150 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">科学计算器</h2>
        <p className="text-gray-600">支持基本运算、三角函数、对数等科学计算功能</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calculator */}
        <div className="lg:col-span-2">
          {/* Display */}
          <div className="p-4 mb-4 text-white bg-gray-900 rounded-lg">
            <div className="overflow-hidden font-mono text-3xl text-right">
              {display}
            </div>
            <div className="mt-1 text-sm text-right text-gray-400">
              {memory !== 0 && `M: ${memory}`}
              <span className="ml-4">{isRadians ? 'RAD' : 'DEG'}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-8 gap-2">
            {/* Row 1 - Memory and Mode */}
            <Button onClick={() => memoryOperation('MC')} className="text-gray-700 bg-gray-200 hover:bg-gray-300">MC</Button>
            <Button onClick={() => memoryOperation('MR')} className="text-gray-700 bg-gray-200 hover:bg-gray-300">MR</Button>
            <Button onClick={() => memoryOperation('M+')} className="text-gray-700 bg-gray-200 hover:bg-gray-300">M+</Button>
            <Button onClick={() => memoryOperation('M-')} className="text-gray-700 bg-gray-200 hover:bg-gray-300">M-</Button>
            <Button onClick={() => memoryOperation('MS')} className="text-gray-700 bg-gray-200 hover:bg-gray-300">MS</Button>
            <Button onClick={() => setIsRadians(!isRadians)} className="text-blue-700 bg-blue-200 hover:bg-blue-300">
              {isRadians ? 'RAD' : 'DEG'}
            </Button>
            <Button onClick={clear} className="col-span-2 text-red-700 bg-red-200 hover:bg-red-300">Clear</Button>

            {/* Row 2 - Functions */}
            <Button onClick={() => performFunction('sin')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">sin</Button>
            <Button onClick={() => performFunction('cos')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">cos</Button>
            <Button onClick={() => performFunction('tan')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">tan</Button>
            <Button onClick={() => performFunction('log')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">log</Button>
            <Button onClick={() => performFunction('ln')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">ln</Button>
            <Button onClick={() => performFunction('sqrt')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">√</Button>
            <Button onClick={() => performFunction('x²')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">x²</Button>
            <Button onClick={() => performOperation('^')} className="text-orange-700 bg-orange-200 hover:bg-orange-300">x^y</Button>

            {/* Row 3 - Inverse Functions */}
            <Button onClick={() => performFunction('asin')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">asin</Button>
            <Button onClick={() => performFunction('acos')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">acos</Button>
            <Button onClick={() => performFunction('atan')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">atan</Button>
            <Button onClick={() => performFunction('1/x')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">1/x</Button>
            <Button onClick={() => performFunction('x!')} className="text-purple-700 bg-purple-200 hover:bg-purple-300">x!</Button>
            <Button onClick={() => insertConstant('π')} className="text-green-700 bg-green-200 hover:bg-green-300">π</Button>
            <Button onClick={() => insertConstant('e')} className="text-green-700 bg-green-200 hover:bg-green-300">e</Button>
            <Button onClick={() => performFunction('±')} className="text-gray-700 bg-gray-200 hover:bg-gray-300">±</Button>

            {/* Row 4-7 - Numbers and Operations */}
            <Button onClick={() => inputNumber('7')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">7</Button>
            <Button onClick={() => inputNumber('8')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">8</Button>
            <Button onClick={() => inputNumber('9')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">9</Button>
            <Button onClick={() => performOperation('÷')} className="text-orange-700 bg-orange-200 hover:bg-orange-300">÷</Button>
            <Button onClick={() => inputNumber('4')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">4</Button>
            <Button onClick={() => inputNumber('5')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">5</Button>
            <Button onClick={() => inputNumber('6')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">6</Button>
            <Button onClick={() => performOperation('×')} className="text-orange-700 bg-orange-200 hover:bg-orange-300">×</Button>

            <Button onClick={() => inputNumber('1')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">1</Button>
            <Button onClick={() => inputNumber('2')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">2</Button>
            <Button onClick={() => inputNumber('3')} className="text-gray-900 bg-gray-100 hover:bg-gray-200">3</Button>
            <Button onClick={() => performOperation('-')} className="text-orange-700 bg-orange-200 hover:bg-orange-300">-</Button>
            <Button onClick={() => inputNumber('0')} className="col-span-2 text-gray-900 bg-gray-100 hover:bg-gray-200">0</Button>
            <Button onClick={inputDecimal} className="text-gray-900 bg-gray-100 hover:bg-gray-200">.</Button>
            <Button onClick={() => performOperation('+')} className="text-orange-700 bg-orange-200 hover:bg-orange-300">+</Button>

            <Button onClick={() => performOperation('=')} className="col-span-8 text-white bg-blue-500 hover:bg-blue-600">=</Button>
          </div>
        </div>

        {/* History */}
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">计算历史</h3>
          <div className="space-y-2 overflow-y-auto max-h-96">
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">暂无计算历史</p>
            ) : (
              history.map((item, index) => (
                <div key={index} className="p-2 font-mono text-sm bg-white border rounded">
                  {item}
                </div>
              ))
            )}
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="w-full px-4 py-2 mt-3 text-gray-700 transition-colors bg-gray-200 rounded hover:bg-gray-300"
            >
              清除历史
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;