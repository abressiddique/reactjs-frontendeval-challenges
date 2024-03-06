import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {

  const [twoDMatrix, setTwoDMatrix] = useState([]);// 100cells
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);

  const prepareTwoDMatrix = () => {
    const matrix = [];
    for (let i = 0; i <= 9; i++) {//rows
      for (let j = 0; j <= 9; j++) {//cols
        const obj = {
          pos: [i, j], // [row,col]
          isColor: false
        }
        matrix.push(obj);
      }
    }
    setTwoDMatrix(matrix);
  }
  console.log(twoDMatrix);

  useEffect(() => {
    prepareTwoDMatrix()
  }, [])

  const handleOnDrag = (e, pos) => {
    console.log('onDrag ', pos);
    setStart(pos);
    prepareTwoDMatrix()
  }

  const handleOnDragOver = (e, pos) => {
    console.log('onDragOver ', pos);
    setEnd(pos);
  }

  const fillColor = (startPos, endPos) => {
    const [startRow, startCol] = startPos;
    const [endRow, endCol] = endPos;
    const selectedGrid = [];
    for (let i = startRow; i <= endRow; i++) {// sub mat rows travers
      for (let j = startCol; j <= endCol; j++) {//sub mat cols travers
        selectedGrid.push([i, j].join(''));
      }
    }
    let copyMat = [...twoDMatrix];
    copyMat = copyMat.map((item) => {
      const { pos } = item;
      const stringPos = pos.join('');
      if (selectedGrid.includes(stringPos)) {
        item.isColor = true;
      }
      return item;
    });
    setTwoDMatrix(copyMat);
  }

  useEffect(() => {
    if (start.length > 1 && end.length > 1) {
      fillColor(start, end)
    }
  }, [start, end])

  return (
    <div className="App">
      <h1>Selectable Grid</h1>
      <div className='grid'>
        <div className='board'>
          {
            twoDMatrix?.map((item, i) => (
              <div
                key={i}
                draggable
                onDragOver={(e) => handleOnDragOver(e, item.pos)}
                onDrag={(e) => handleOnDrag(e, item.pos)}
                className={
                  `cell ${item.isColor && 'selected-cell'}`}
              >{item.pos}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
