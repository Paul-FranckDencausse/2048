class StorageManager {
  bestScoreKey;
  gameStateKey;
  storage;

  constructor() {
    this.bestScoreKey = "bestScore";
    this.gameStateKey = "gameState";
    this.storage = window.localStorage;
  }

  getBestScore() {
    return this.storage.getItem(this.bestScoreKey) || 0;
  };

  setBestScore(score) {
    this.storage.setItem(this.bestScoreKey, score);
  };

  getGameState() {
    const stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
  };

  setGameState(gameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
  };

  clearGameState() {
    this.storage.removeItem(this.gameStateKey);
  };
}

export default StorageManager;