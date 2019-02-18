export class Chip8Program {
  private name: string;
  private program: Uint8Array;

  constructor(name: string, program: Uint8Array) {
    this.name = name;
    this.program = program;
  }

  public getName() {
    return this.name;
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
