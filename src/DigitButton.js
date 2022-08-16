import {ACTIONS} from "./Calculator";

const DigitNumber = ({digit, dispatch}) => {


  return (
    <button
      onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
      {digit}</button >
  );
};
export default DigitNumber;