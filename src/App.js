import  { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {

  const [history, setHistory] = useState( [ { squares : Array(9).fill(null) } ] );
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
const currunt = history[stepNumber];
const winner = calculateWinner(currunt.squares);

let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrunt = newHistory[newHistory.length - 1];
    const _squares = newCurrunt.squares.slice();
    if (calculateWinner(_squares) || _squares[i]) {
      return;
    }


    _squares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setHistory([...newHistory, { squares: _squares }]);
    setStepNumber(newHistory.length);
  }

const moves = history.map((step, move) => {
  const desc = move ? 'Go to move'+move: ' Go to game start';
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{desc}</button>
    </li>
  )
})

const jumpTo = (move) => {
  setHistory(history.slice(0, move + 1));
  setStepNumber(move);
  setXIsNext(move % 2 === 0);
}

  return (
    <div className='game'>
        <div className='game-board'>
          <Board squares={currunt.squares} onClick={(i) => handleClick(i)}/>
        </div>
        <div className='game-info'>
          <div className='status'>{status}</div>
          <ol>{moves}</ol>
        </div>
    </div>
  );
}

export default App;

