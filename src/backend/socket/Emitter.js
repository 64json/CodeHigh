class Emitter {
  constructor(io, room) {
    this.io = io;
    this.room = room;
  }

  emit(...args) {
    this.io.to(this.room).emit(...args);
  }
}

export default Emitter;