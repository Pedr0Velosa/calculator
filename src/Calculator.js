import {useReducer} from "react";
import DigitNumber from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operator',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
};

const MAX_DIGITS = 10000000;

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentNumber === '0') return state;
      if (payload.digit === '.' && state.currentNumber == null) {
        return {
          ...state,
          currentNumber: '0.'
        };
      }
      if (payload.digit === '.' && state.currentNumber.includes('.')) return state;
      if (state.currentNumber && state.currentNumber.length === 8 && payload.digit === '.') {
        return {
          ...state,
          currentNumber: `${state.currentNumber || ""}${payload.digit}`
        };
      }
      if (state.currentNumber && (state.currentNumber.length - state.currentNumber.indexOf('.') === 9)) return state;
      return {
        ...state,
        currentNumber: `${state.currentNumber || ""}${payload.digit}`
      };
    case ACTIONS.CLEAR:
      return {
        previusNumber: null,
        currentNumber: null,
        operation: null
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.currentNumber == null) return state;
      return {
        ...state,
        currentNumber: state.currentNumber.slice(0, -1)
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentNumber == null) return state;
      if (state.previusNumber == null) return {
        operation: payload.operation,
        previusNumber: state.currentNumber,
        currentNumber: null
      };
      return {
        operation: payload.operation,
        previusNumber: evaluate(state).toString(),
        currentNumber: null
      };
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.previusNumber == null) return state;
      return {
        operation: null,
        previusNumber: null,
        currentNumber: evaluate(state).toString()
      };
    default:
      return state;
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-us");

const formatNumber = (number) => {
  if (number == null) return;
  const [interger, decimal] = number.split('.');
  if (decimal == null) return NUMBER_FORMATTER.format(interger);
  return `${NUMBER_FORMATTER.format(interger)}.${decimal}`;
};

const evaluate = ({currentNumber, previusNumber, operation}) => {
  switch (operation) {
    case '+':
      return Math.round((parseFloat(previusNumber) + parseFloat(currentNumber || 0)) * MAX_DIGITS) / MAX_DIGITS;
    case '-':
      return Math.round((parseFloat(previusNumber) - parseFloat(currentNumber || 0)) * MAX_DIGITS) / MAX_DIGITS;
    case 'x':
      return Math.round((parseFloat(previusNumber) * parseFloat(currentNumber || 0)) * MAX_DIGITS) / MAX_DIGITS;
    case '/':
      return Math.round((parseFloat(previusNumber) / parseFloat(currentNumber || 0)) * MAX_DIGITS) / MAX_DIGITS;
    default:
      return;
  }
};

const Calculator = () => {

  const [{currentNumber, previusNumber, operation}, dispatch] = useReducer(reducer, {});
  return (
    <div id="calculator" className="flex gap-2 p-4 bg-neutral-500">
      <div className="display">
        <span className="previous">{formatNumber(previusNumber || '')} {operation}</span>
        <span className="current">{formatNumber(currentNumber || '0')}</span>
      </div>
      <div className="tiles__container gap-2 text-3xl">
        <OperationButton operation='c' dispatch={dispatch} />
        <OperationButton operation='del' dispatch={dispatch} />
        <OperationButton operation='/' dispatch={dispatch} />
        <DigitNumber digit='7' dispatch={dispatch} />
        <DigitNumber digit='8' dispatch={dispatch} />
        <DigitNumber digit='9' dispatch={dispatch} />
        <OperationButton operation='x' dispatch={dispatch} />
        <DigitNumber digit='4' dispatch={dispatch} />
        <DigitNumber digit='5' dispatch={dispatch} />
        <DigitNumber digit='6' dispatch={dispatch} />
        <OperationButton operation='-' dispatch={dispatch} />
        <DigitNumber digit='1' dispatch={dispatch} />
        <DigitNumber digit='2' dispatch={dispatch} />
        <DigitNumber digit='3' dispatch={dispatch} />
        <OperationButton operation='+' dispatch={dispatch} />
        <DigitNumber digit='0' dispatch={dispatch} />
        <DigitNumber digit='.' dispatch={dispatch} />
        <OperationButton operation='=' dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Calculator;