import { getEventEmitter } from './eventManager';
import Tile from './Tile';
import Grid from './Grid';
import StorageManager from './StorageManager';

const eventEmitter = getEventEmitter();

class GameManager {
  eventEmitter;
  isOver;
  isWon;
  size;
  grid;
  startTiles;
  storageManager;
  score;

  constructor() {
    this.eventEmitter = getEventEmitter();
    this.isOver = false;
    this.isWon = false;
    this.size = 4;
    this.storageManager = new StorageManager();
    this.startTiles = 2;
    this.eventEmitter.on("move", this.move.bind(this));
    this.eventEmitter.on("restart", this.restart.bind(this));
    this.setup();
  }

  addStartTiles() {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  };

  isGameTerminated() {
    return this.isOver || this.isWon;
  }

  setup() {
    const previousState = this.storageManager.getGameState();

    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells);
      this.score = previousState.score;
      this.isOver = previousState.isOver;
      this.isWon = previousState.isWon;
    } else {
      this.grid = new Grid(this.size);
      this.score = 0;
      this.isOver = false;
      this.isWon = false;
      this.addStartTiles();
    }

    this.persist();
  };

  restart() {
    this.storageManager.clearGameState();
    this.setup();
    this.persist();
  };

  getVector(direction) {
    let map = {
      0: { x: 0, y: -1 }, // Up
      1: { x: 1, y: 0 },  // Right
      2: { x: 0, y: 1 },  // Down
      3: { x: -1, y: 0 }   // Left
    };

    return map[direction];
  }

  buildTraversals(vector) {
    let traversals = { x: [], y: [] };

    for (let pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  };

  prepareTiles() {
    this.grid.eachCell((x, y, tile) => {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  findFarthestPosition(cell, vector) {
    let previous;

    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));
    return {
      farthest: previous,
      next: cell
    };
  };

  moveTile(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  };

  positionsEqual(first, second) {
    return first.x === second.x && first.y === second.y;
  };

  addRandomTile() {
    if (this.grid.cellsAvailable()) {
      const value = Math.random() < 0.75 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  };

  tileMatchesAvailable() {
    let tile;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        tile = this.grid.cellContent({ x: x, y: y });

        if (tile) {
          for (let direction = 0; direction < 4; direction++) {
            const vector = this.getVector(direction);
            const cell = { x: x + vector.x, y: y + vector.y };
            const other = this.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  };

  persist() {
    if (this.storageManager.getBestScore() < this.score) {
      this.storageManager.setBestScore(this.score);
    }
    if (this.isOver) {
      this.storageManager.clearGameState();
    } else {
      this.storageManager.setGameState(this.serialize());
    }
    if (this.isWon) {
      this.storageManager.clearGameState();
    }

    this.eventEmitter.emit('board-update', {
      grid: this.grid,
      score: this.score,
      isOver: this.isOver,
      isWon: this.isWon,
      bestScore: this.storageManager.getBestScore(),
    });
  };

  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      isOver: this.isOver,
      isWon: this.isWon,
    };
  };

  move(direction) {
    // 0: up, 1: right, 2: down, 3: left
    if (this.isGameTerminated()) {
      return;
    }

    let cell, tile;
    let moved = false;
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);

    this.prepareTiles();
    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        cell = { x: x, y: y };
        tile = this.grid.cellContent(cell);

        if (tile) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);

          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2);

            merged.mergedFrom = [tile, next];
            this.grid.insertTile(merged);
            this.grid.removeTile(tile);
            tile.updatePosition(positions.next);
            this.score += merged.value;
            if (merged.value === 2048) {
              this.isWon = true;
            }
          } else {
            this.moveTile(tile, positions.farthest);
          }

          if (!this.positionsEqual(cell, tile)) {
            moved = true;
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();
      if (!this.movesAvailable()) {
        this.isOver = true;
      }
      this.persist();
    }
  }
}

export default GameManager;
