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
    renderSquare(i, j) {
        return (
            <Square
                value={this.props.squares[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    renderRow(i) {
        let renderedRow = [];
        let end = this.props.squares[i].length;
        for (let j = 0; j < end; j++) {
            renderedRow.push(this.renderSquare(i, j));
        }
        
        return (renderedRow);
    }

    render() {
        let board = [];

        for (let i = 0; i < this.props.squares.length; i++) {
            let row = (
                <div className="board-row">
                    {this.renderRow(i)}
                </div>
            );
            board.push(row);
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(3).fill(null).map(() => Array(3).fill(null)),
            }],
            xIsNext: true,
            winCondition: 3,
            winner: null,
            stepNumber: 0,
        }
    }

    scan(_y, _x, squares, xIncrement, yIncrement) {
        let match = 0;
        let player = this.state.xIsNext ? 'X' : 'O';

        let invXIncrement = xIncrement * (-1);
        let invYIncrement = yIncrement * (-1);

        //-1,0
        for (let y = _y, x = _x; x >= 0 && y >= 0; x += xIncrement, y += yIncrement) {
            if (player === squares[y][x]) {
                match++;
            } else {
                break;
            }
        }
        for (let y = _y, x = _x; x < squares[_y].length && y < squares.length; x += invXIncrement, y += invYIncrement) {
            if (player === squares[y][x]) {
                match++;
            } else {
                break;
            }
        }
        match -= 1;
        if (match >= this.state.winCondition) {
            return squares[_y][_x];
        }
        return null;
    }

    //i, j
    calculateWinner(_y, _x, squares) {
        //-1, 0
        let result = this.scan(_y, _x, squares, -1, 0);
        if (result)
            return result;

        //-1,-1
        result = this.scan(_y, _x, squares, -1, -1);
        if (result)
            return result;

        //0,-1
        result = this.scan(_y, _x, squares, 0, -1);
        if (result)
            return result;

        //-1,1
        result = this.scan(_y, _x, squares, 1, -1);
        if (result)
            return result;

        return null;
    }

    deepCopyArray(obj) {
        const cpy = Array(3).fill(obj.length);
        for(let i = 0; i < cpy.length; i++) {
            cpy[i] = obj[i].slice();
        }
        return cpy;
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = this.deepCopyArray(this.deepCopyArray(current.squares));

        if (squares[i][j] || this.state.winner) {
            return;
        }

        squares[i][j] = this.state.xIsNext === true ? 'X' : 'O';
        var winner = this.calculateWinner(i, j, squares);

        this.setState(
            {
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
                winner: winner
            });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winner: null,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.state.winner;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i, j) => this.handleClick(i, j)} />
                </div>
                <div className="game-info">
                <div className="status">{status}</div>
                    <ol>{moves}</ol>
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
