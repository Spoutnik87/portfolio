export class Chip8Keyboard {
  private keys: Array<boolean>;

  constructor() {
    this.keys = new Array(16);
  }

  public getKeys(): boolean[] {
    return this.keys;
  }

  public getKey(position: number): boolean {
    return this.keys[position];
  }

  public setKey(position: number, value: boolean): void {
    this.keys[position] = value;
  }

  public waitForInput() {}
}
