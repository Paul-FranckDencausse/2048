import EventEmitter from 'eventemitter2';

let eEmitter;
const keyMap = {
  38: 0, // Up
  39: 1, // Right
  40: 2, // Down
  37: 3, // Left
};

const getEventEmitter = () => {
  if (!eEmitter) {
    eEmitter = new EventEmitter();
  }
  return eEmitter;
}
const keyDownEventHandler = (event) => {
  const move = keyMap[event.which];

  if (move !== undefined) {
    event.preventDefault();
    getEventEmitter().emit('move', move);
  }
}

const hookEvents = () => {
  document.addEventListener("keydown", keyDownEventHandler);
}

const unhookEvents = () => {
  document.removeEventListener("keydown", keyDownEventHandler);
}

export {
  getEventEmitter,
  hookEvents,
  unhookEvents,
};
