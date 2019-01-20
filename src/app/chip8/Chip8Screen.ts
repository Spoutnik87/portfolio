export class Chip8Screen {
  private screen: Array<boolean>;

  private needUpdate: boolean;

  constructor() {
    // Screen - 64*32 Monochrome
    this.screen = new Array(2048);
    this.needUpdate = false;
  }

  /**
   * Get state at specified position
   * @param x 0-63 number
   * @param y 0-31 number
   * @returns True if on, false if off
   */
  public get(x: number, y: number): boolean {
    return this.screen[y * 64 + x];
  }

  public getLine(x: number, y: number): number {
    let line = 0;
    for (let i = 0; i < 8; i++) {
      if (i !== 0) {
        line <<= 1;
      }
      line += +this.get((x + i) % 64, y);
    }
    return line;
  }

  public getLines(x: number, y: number, n: number): Uint8Array {
    const lines = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      lines[i] = this.getLine(x, (y + i) % 32);
    }
    return lines;
  }

  /**
   * Set state at specified coordinates
   * @param x 0-63 number
   * @param y 0-31 number
   * @param state State
   */
  public set(x: number, y: number, state: boolean): void {
    this.screen[y * 64 + x] = state;
  }

  public setLine(x: number, y: number, line: number): void {
    for (let i = 0; i < 8; i++) {
      this.set((x + i) % 64, y, Boolean((line >> (7 - i)) & 0x1));
    }
  }

  public setLines(x: number, y: number, lines: Uint8Array): void {
    for (let i = 0; i < lines.length; i++) {
      this.setLine(x, (y + i) % 32, lines[i]);
    }
  }

  public isUpdateNeeded(): boolean {
    return this.needUpdate;
  }

  public setUpdated(needUpdate: boolean): void {
    this.needUpdate = needUpdate;
  }

  /**
   * Set all pixels to state off.
   */
  public clear(): void {
    for (let i = 0; i < this.screen.length; i++) {
      this.screen[i] = false;
    }
  }
}
