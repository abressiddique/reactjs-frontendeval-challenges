import { useEffect } from 'react';
import './App.css';
import { useRef } from 'react';
import { useState } from 'react';

function App() {
  const emptyArr = ['', '', '', ''];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = '1234';



  // the below function will submit the opt with the help of map and filter 
  const handleSubmit = () => {

    const missed = inputs.map((item, i) => {
      if (item === '')
        return i;
    }).filter((item) => (item || item === 0));
    console.log('missed ', missed);
    setMissing(missed);
    if (missed.length) {
      return
    }

    const userInput = inputs.join('');
    const isMatch = userInput === CODE;
    const msg = isMatch ? 'Code is Valid' : 'Code is not Valid';
    alert(msg);
  }
  //  below we are using useeffect coz we wanna have our focus at 1st input bar
  useEffect(() => {
    refs[0].current.focus();
  }, [])
// to put data in the input that why and also hanlde the input alos handle the focus
  const handleInputChange = (e, index) => {
    const val = e.target.value;
    console.log(val, !Number(val), index);
    if (!Number(val))
      return;

    console.log('index: ', index);
    if (index < inputs.length - 1) { // 1
      refs[index + 1].current.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  }
// for key down we using the below fucniton 8 is the same value of the backspace 
  const handleOnKeyDown = (e, index) => {
    console.log(e.keyCode, index);
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  }
// this is used for handling the paste thingy dont worry its easy dude 
  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text');
    console.log('paste data ', data)
    if (!Number(data) || data.length !== inputs.length)
      return;

    const pastCode = data.split('');
    setInputs(pastCode);
    refs[inputs.length - 1].current.focus();
  }
  console.log('inputs ', inputs);
  return (
    <div className="App">
      <h1>Two-factor code input</h1>
      <div>
        {
          emptyArr.map((item, i) => {
            return <input
              value={inputs[i]}
              key={i}
              ref={refs[i]}
              type='text'
              maxLength="1"
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleOnKeyDown(e, i)}
              className={missing.includes(i) ? 'error' : ''}
            />
          })
        }
      </div>
      <button
        onClick={handleSubmit}
      >Submit</button>
    </div>
  );
}

export default App;
