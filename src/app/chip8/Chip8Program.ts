export class Chip8Program {
  private program: Uint8Array;

  constructor(program: Uint8Array) {
    this.program = program;
  }

  /**
   * @returns 1 Byte value
   */
  public get(position: number): number {
    return this.program[position];
  }

  public getSize(): number {
    return this.program.length;
  }
}
