import {useEffect, useState} from "react";
import {ACTIONS} from "./Calculator";

const OperationButton = ({operation, dispatch}) => {

  const [action, setAction] = useState({});

  useEffect(() => {
    switch (operation) {
      case 'c':
        setAction({type: ACTIONS.CLEAR});
        break;
      case 'del':
        setAction({type: ACTIONS.DELETE_DIGIT});
        break;
      case '=':
        setAction({type: ACTIONS.EVALUATE});
        break;
      default:
        setAction({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}});
        break;
    }
  }, [operation]);

  return (
    <button
      className="dark"
      onClick={() => dispatch(action)}
    >{operation}</button>
  );
};
export default OperationButton;