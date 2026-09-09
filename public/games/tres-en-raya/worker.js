const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resultFor(board) {
  const line = LINES.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
  );
  return { winner: line ? board[line[0]] : null, line: line || null };
}

function emptyCells(board) {
  return board.flatMap((value, index) => (value ? [] : [index]));
}

function randomChoice(options) {
  return options[Math.floor(Math.random() * options.length)];
}

class TicTacToe {
  constructor(options = {}) {
    this.configure(options);
    this.reset();
  }

  configure(options = {}) {
    this.mode = options.mode === 'local' ? 'local' : 'computer';
    this.difficulty = ['easy', 'medium', 'hard'].includes(options.difficulty)
      ? options.difficulty
      : 'medium';
    this.human = options.human === 'O' ? 'O' : 'X';
    this.computer = this.human === 'X' ? 'O' : 'X';
  }

  reset(options) {
    if (options) this.configure(options);
    this.board = Array(9).fill('');
    this.turn = 'X';
    this.winner = null;
    this.winningLine = null;
    this.draw = false;
  }

  applyMove(cell) {
    this.board[cell] = this.turn;
    const result = resultFor(this.board);
    this.winner = result.winner;
    this.winningLine = result.line;
    this.draw = !this.winner && this.board.every(Boolean);
    if (!this.winner && !this.draw) this.turn = this.turn === 'X' ? 'O' : 'X';
  }

  move(cell) {
    if (!Number.isInteger(cell) || cell < 0 || cell > 8)
      throw new Error('Casilla inválida');
    if (
      this.winner ||
      this.draw ||
      this.board[cell] ||
      (this.mode === 'computer' && this.turn !== this.human)
    )
      return;
    this.applyMove(cell);
  }

  findTacticalMove() {
    const available = emptyCells(this.board);
    for (const symbol of [this.computer, this.human]) {
      for (const cell of available) {
        const trial = [...this.board];
        trial[cell] = symbol;
        if (resultFor(trial).winner === symbol) return cell;
      }
    }
    if (!this.board[4]) return 4;
    const corners = [0, 2, 6, 8].filter((cell) => !this.board[cell]);
    return randomChoice(corners.length ? corners : available);
  }

  minimax(board, maximizing, depth = 0) {
    const { winner } = resultFor(board);
    if (winner === this.computer) return 10 - depth;
    if (winner === this.human) return depth - 10;
    const available = emptyCells(board);
    if (!available.length) return 0;

    const scores = available.map((cell) => {
      const trial = [...board];
      trial[cell] = maximizing ? this.computer : this.human;
      return this.minimax(trial, !maximizing, depth + 1);
    });
    return maximizing ? Math.max(...scores) : Math.min(...scores);
  }

  findBestMove() {
    const available = emptyCells(this.board);
    let bestScore = -Infinity;
    let bestMoves = [];
    for (const cell of available) {
      const trial = [...this.board];
      trial[cell] = this.computer;
      const score = this.minimax(trial, false, 0);
      if (score > bestScore) {
        bestScore = score;
        bestMoves = [cell];
      } else if (score === bestScore) bestMoves.push(cell);
    }
    return randomChoice(bestMoves);
  }

  computerMove() {
    if (
      this.mode !== 'computer' ||
      this.turn !== this.computer ||
      this.winner ||
      this.draw
    )
      return;
    const available = emptyCells(this.board);
    const cell =
      this.difficulty === 'easy'
        ? randomChoice(available)
        : this.difficulty === 'medium'
          ? this.findTacticalMove()
          : this.findBestMove();
    this.applyMove(cell);
  }

  state() {
    return {
      board: [...this.board],
      turn: this.turn,
      winner: this.winner,
      winning_line: this.winningLine,
      draw: this.draw,
      mode: this.mode,
      difficulty: this.difficulty,
      human: this.human,
      computer: this.computer,
    };
  }
}

let game;
self.onmessage = ({ data }) => {
  try {
    if (data.type === 'init') game = new TicTacToe(data.options);
    else if (!game) throw new Error('El juego no está preparado');
    else if (data.type === 'reset') game.reset(data.options);
    else if (data.type === 'move') game.move(data.cell);
    else if (data.type === 'computer_move') game.computerMove();
    else if (data.type !== 'state') throw new Error('Comando inválido');
    self.postMessage({ id: data.id, state: game.state() });
  } catch (error) {
    self.postMessage({ id: data.id, error: String(error.message || error) });
  }
};
