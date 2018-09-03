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
            winCondition: 3,
            winner: null
        };
    }

    //i, j
    calculateWinner(_y, _x , squares) {

        let match = 0;
        let player = this.state.xIsNext? 'X' : 'O';
        //-1,0
        for(let y = _y, x = _x; x >=0; x--) {
            //console.log(x,y,squares[y][x]);

            if(player==squares[y][x]) {
                match++;
            }
        }
        for(let y = _y, x = _x; x < squares.length; x++) {
            //console.log(x,y,squares[y][x]);

            if(player==squares[y][x]) {
                match++;
            }
        }
        match -= 1;
        if (match===this.state.winCondition) {
            console.log(player + " won!");

            return this.state.squares[_y][_x];
        }

        //-1,-1

        //0,1

        //1,1

        return null;
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();

        if (squares[i][j] || this.state.winner ) {
            return;
        }

        squares[i][j] = this.state.xIsNext === true ? 'X' : 'O';
        var winner = this.calculateWinner(i, j, squares);
        console.log(winner);
        // if(winner) {
        //     this.state.winner = winner;
        // }
        const xIsNext = !this.state.xIsNext;
        this.setState(
            {
                squares: squares,
                xIsNext: xIsNext,
                winner: winner
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
        let status;
        const winner = this.state.winner;

        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
       
        
        var board = [];


        for (let i = 0; i < this.state.squares.length; i++) {
            var row = (
                <div className="board-row">
                    {this.renderRow(i)}
                </div>
            );
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
