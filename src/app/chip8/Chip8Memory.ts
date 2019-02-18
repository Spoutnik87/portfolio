import { Chip8Program } from './Chip8Program';

export class Chip8Memory {
  private memory: Uint8Array;

  private readonly FONT_SET = [
    0xf0,
    0x90,
    0x90,
    0x90,
    0xf0,
    0x20,
    0x60,
    0x20,
    0x20,
    0x70,
    0xf0,
    0x10,
    0xf0,
    0x80,
    0xf0,
    0xf0,
    0x10,
    0xf0,
    0x10,
    0xf0,
    0x90,
    0x90,
    0xf0,
    0x10,
    0x10,
    0xf0,
    0x80,
    0xf0,
    0x10,
    0xf0,
    0xf0,
    0x80,
    0xf0,
    0x90,
    0xf0,
    0xf0,
    0x10,
    0x20,
    0x40,
    0x40,
    0xf0,
    0x90,
    0xf0,
    0x90,
    0xf0,
    0xf0,
    0x90,
    0xf0,
    0x10,
    0xf0,
    0xf0,
    0x90,
    0xf0,
    0x90,
    0x90,
    0xe0,
    0x90,
    0xe0,
    0x90,
    0xe0,
    0xf0,
    0x80,
    0x80,
    0x80,
    0xf0,
    0xe0,
    0x90,
    0x90,
    0x90,
    0xe0,
    0xf0,
    0x80,
    0xf0,
    0x80,
    0xf0,
    0xf0,
    0x80,
    0xf0,
    0x80,
    0x80,
  ];

  constructor() {
    // 4096 Bytes memory
    this.memory = new Uint8Array(4096);

    // Load font set into memory
    this.FONT_SET.map((value, i) => {
      this.memory[i] = value;
    });
  }

  /**
   * @param Position 2 bytes value (max 4096)
   * @param value 1 byte value
   */
  public set(position: number, value: number): void {
    this.memory[position] = value;
  }

  /**
   * @param position 2 bytes value (max 4096)
   * @returns 1 byte value
   */
  public get(position: number): number {
    return this.memory[position];
  }

  /**
   * Clear the memory
   */
  public clear(): void {
    for (let i = 0; i < this.memory.length; i++) {
      this.memory[i] = 0;
    }
  }

  public load(program: Chip8Program) {
    for (let i = 0; i < program.getSize(); i++) {
      this.set(0x200 + i, program.get(i));
    }
  }
}
