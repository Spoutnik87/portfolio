export class Chip8Storage {
  private storage: Uint8Array;

  constructor() {
    this.storage = new Uint8Array(32768);
  }
}
