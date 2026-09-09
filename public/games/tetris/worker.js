const SHAPES = [
  [[1, 1, 1, 1]],
  [
    [2, 2],
    [2, 2],
  ],
  [
    [0, 3, 0],
    [3, 3, 3],
  ],
  [
    [0, 4, 4],
    [4, 4, 0],
  ],
  [
    [5, 5, 0],
    [0, 5, 5],
  ],
  [
    [6, 0, 0],
    [6, 6, 6],
  ],
  [
    [0, 0, 7],
    [7, 7, 7],
  ],
];
const copy = (piece) => piece.map((row) => [...row]);

class Tetris {
  constructor() {
    this.board = Array.from({ length: 20 }, () => Array(10).fill(0));
    this.bag = [];
    this.score = 0;
    this.lines = 0;
    this.over = false;
    this.paused = false;
    this.nextPiece = this.take();
    this.spawn();
  }
  take() {
    if (!this.bag.length) {
      this.bag = [0, 1, 2, 3, 4, 5, 6];
      for (let i = this.bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
      }
    }
    return copy(SHAPES[this.bag.pop()]);
  }
  spawn() {
    this.piece = this.nextPiece;
    this.nextPiece = this.take();
    this.x = Math.floor((10 - this.piece[0].length) / 2);
    this.y = 0;
    if (!this.fits(this.piece, this.x, this.y)) this.over = true;
  }
  fits(piece, x, y) {
    return piece.every((row, r) =>
      row.every(
        (value, c) =>
          !value ||
          (x + c >= 0 &&
            x + c < 10 &&
            y + r >= 0 &&
            y + r < 20 &&
            !this.board[y + r][x + c]),
      ),
    );
  }
  clearLines() {
    const remaining = this.board.filter((row) => !row.every(Boolean));
    const count = 20 - remaining.length;
    this.board = [
      ...Array.from({ length: count }, () => Array(10).fill(0)),
      ...remaining,
    ];
    this.score +=
      [0, 100, 300, 500, 800][count] * (Math.floor(this.lines / 10) + 1);
    this.lines += count;
  }
  lock() {
    this.piece.forEach((row, r) =>
      row.forEach((value, c) => {
        if (value) this.board[this.y + r][this.x + c] = value;
      }),
    );
    this.clearLines();
    this.spawn();
  }
  action(action) {
    if (
      !['left', 'right', 'down', 'rotate', 'drop', 'tick', 'pause'].includes(
        action,
      )
    )
      throw new Error('Acción inválida');
    if (this.over) return;
    if (action === 'pause') {
      this.paused = !this.paused;
      return;
    }
    if (this.paused) return;
    if (action === 'left' || action === 'right') {
      const dx = action === 'left' ? -1 : 1;
      if (this.fits(this.piece, this.x + dx, this.y)) this.x += dx;
      return;
    }
    if (action === 'rotate') {
      const rotated = this.piece[0].map((_, index) =>
        this.piece.map((row) => row[index]).reverse(),
      );
      for (const dx of [0, -1, 1, -2, 2])
        if (this.fits(rotated, this.x + dx, this.y)) {
          this.piece = rotated;
          this.x += dx;
          break;
        }
      return;
    }
    if (action === 'drop') {
      while (this.fits(this.piece, this.x, this.y + 1)) {
        this.y++;
        this.score += 2;
      }
      this.lock();
      return;
    }
    if (this.fits(this.piece, this.x, this.y + 1)) {
      this.y++;
      if (action === 'down') this.score++;
    } else this.lock();
  }
  state() {
    const grid = this.board.map((row) => [...row]);
    if (!this.over)
      this.piece.forEach((row, r) =>
        row.forEach((value, c) => {
          if (value) grid[this.y + r][this.x + c] = value;
        }),
      );
    return {
      board: grid,
      score: this.score,
      lines: this.lines,
      level: Math.floor(this.lines / 10) + 1,
      over: this.over,
      paused: this.paused,
      next: this.nextPiece,
    };
  }
}

let game;
self.onmessage = ({ data }) => {
  try {
    if (data.type === 'init' || data.type === 'reset') game = new Tetris();
    else if (!game) throw new Error('El juego no está preparado');
    else if (data.type === 'action') game.action(data.action);
    else if (data.type !== 'state') throw new Error('Comando inválido');
    self.postMessage({ id: data.id, state: game.state() });
  } catch (error) {
    self.postMessage({ id: data.id, error: String(error.message || error) });
  }
};
