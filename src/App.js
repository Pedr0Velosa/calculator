import Calculator from './Calculator.js';
import {useEffect} from 'react';
import './index.css';

const App = () => {

  useEffect(() => {
    document.title = 'Calculator';
  }, []);

  return (
    <Calculator />
  );
};

export default App;
