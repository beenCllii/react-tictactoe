import React, { Component } from 'react'
import Square from './Square'
import './Board.css'

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const _squares = this.state.squares.slice();
    _squares[i] = 'X'; // For simplicity, we are just setting 'X'
    this.setState({ squares: _squares });
  }


    renderSquare(i) {
    return <Square value={this.state.squares[i]}
                    onClick = {() => {this.handleClick(i)}}/>
  }


  render() {
    return (
      <div>
        <div className='status'>Next Player : X</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
        </div>
        <div className='board-row'>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}