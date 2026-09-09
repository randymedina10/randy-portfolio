"""Tres en raya: motor independiente de la interfaz, dos jugadores locales."""
class TicTacToe:
    def __init__(self):
        self.board = [""] * 9
        self.turn = "X"
        self.winner = None
        self.draw = False

    def move(self, cell):
        if type(cell) is not int or not 0 <= cell < 9:
            raise ValueError("La casilla debe ser un entero entre 0 y 8.")
        if self.winner or self.draw or self.board[cell]:
            return self.state()
        self.board[cell] = self.turn
        lines = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]
        if any(all(self.board[i] == self.turn for i in line) for line in lines):
            self.winner = self.turn
        self.draw = not self.winner and all(self.board)
        if not self.winner and not self.draw:
            self.turn = "O" if self.turn == "X" else "X"
        return self.state()

    def state(self):
        return {"board": self.board[:], "turn": self.turn, "winner": self.winner, "draw": bool(self.draw)}

if __name__ == "__main__":
    game = TicTacToe()
    while not game.winner and not game.draw:
        print("\\n".join(" | ".join(game.board[r*3+c] or str(r*3+c+1) for c in range(3)) for r in range(3)))
        try:
            game.move(int(input(f"Turno {game.turn} (1-9): ")) - 1)
        except ValueError as error:
            print(error)
    print(f"Gana {game.winner}" if game.winner else "Empate")

