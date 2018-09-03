import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {


    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill(null).map(() => Array(3).fill(null)),
            xIsNext: true,
        };
    }

    calculateWinner(i) {

    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();

        if (squares[i][j]) {
            return;
        }
        console.log(JSON.stringify(squares));
        squares[i][j] = this.state.xIsNext === true ? 'X' : 'O';
        console.log(JSON.stringify(squares));
        const xIsNext = !this.state.xIsNext;
        this.setState(
            {
                squares: squares,
                xIsNext: xIsNext,
            });
    }

    renderSquare(i, j) {
        return (
            <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
            />
        );
    }

    renderRow(i) {
        let renderedRow = [];
        //let end = i + 3;
        let end = this.state.squares[i].length;
        for (let j = 0; j < end; j++) {
            renderedRow.push(this.renderSquare(i, j));
        }


        return (renderedRow);
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        var board = [];


        for (let i = 0; i < this.state.squares.length; i++) {
            var row = (<div className="board-row">
                {this.renderRow(i)}
            </div>);
            board.push(row);
        }

        return (
            <div>
                <div className="status">{status}</div>
                {
                    board
                }
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
