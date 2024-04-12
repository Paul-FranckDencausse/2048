import Tile from './Tile';

class Grid {
  size;
  cells;

  constructor(size, previousState = null) {
    this.size = size;
    this.cells = previousState ? this.fromState(previousState) : this.empty();
  }

  empty () {
    const cls = [];
  
    for (let x = 0; x < this.size; x++) {
      const row = cls[x] = [];
  
      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    return cls;
  };

  fromState (state) {
    const cls = [];
  
    for (let x = 0; x < this.size; x++) {
      const row = cls[x] = [];
  
      for (let y = 0; y < this.size; y++) {
        let tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }
  
    return cls;
  };

  randomAvailableCell() {
    const cells = this.availableCells();
  
    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  };

  availableCells() {
    const cells = [];
  
    this.eachCell(function (x, y, tile) {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });
  
    return cells;
  };

  eachCell(callback) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  };

  cellsAvailable() {
    return !!this.availableCells().length;
  };

  cellAvailable(cell) {
    return !this.cellOccupied(cell);
  };

  cellOccupied(cell) {
    return !!this.cellContent(cell);
  };

  cellContent(cell) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    }
    return null;
  };

  insertTile(tile) {
    this.cells[tile.x][tile.y] = tile;
  };

  removeTile(tile) {
    this.cells[tile.x][tile.y] = null;
  };

  withinBounds(position) {
    return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;
  };

  serialize() {
    const cState = [];
  
    for (let x = 0; x < this.size; x++) {
      const row = cState[x] = [];
  
      for (let y = 0; y < this.size; y++) {
        row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
      }
    }
  
    return {
      size: this.size,
      cells: cState
    };
  };
}

export default Grid;
