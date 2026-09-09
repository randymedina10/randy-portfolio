class TicTacToe {
  constructor() {
    this.reset();
  }
  reset() {
    this.board = Array(9).fill('');
    this.turn = 'X';
    this.winner = null;
    this.winningLine = null;
    this.draw = false;
  }
  move(cell) {
    if (!Number.isInteger(cell) || cell < 0 || cell > 8)
      throw new Error('Casilla inválida');
    if (this.winner || this.draw || this.board[cell]) return;
    this.board[cell] = this.turn;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.winningLine =
      lines.find((line) =>
        line.every((index) => this.board[index] === this.turn),
      ) || null;
    if (this.winningLine) this.winner = this.turn;
    this.draw = !this.winner && this.board.every(Boolean);
    if (!this.winner && !this.draw) this.turn = this.turn === 'X' ? 'O' : 'X';
  }
  state() {
    return {
      board: [...this.board],
      turn: this.turn,
      winner: this.winner,
      winning_line: this.winningLine,
      draw: this.draw,
    };
  }
}

let game;
self.onmessage = ({ data }) => {
  try {
    if (data.type === 'init' || data.type === 'reset') game = new TicTacToe();
    else if (!game) throw new Error('El juego no está preparado');
    else if (data.type === 'move') game.move(data.cell);
    else if (data.type !== 'state') throw new Error('Comando inválido');
    self.postMessage({ id: data.id, state: game.state() });
  } catch (error) {
    self.postMessage({ id: data.id, error: String(error.message || error) });
  }
};
