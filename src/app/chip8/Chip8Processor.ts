import { getRandomIntInclusive } from '../functions/functions';
import { Chip8 } from './Chip8';
import { Chip8Keyboard } from './Chip8Keyboard';
import { Chip8Memory } from './Chip8Memory';
import { Chip8OpCode, Chip8OpCodeType } from './Chip8OpCode';
import { Chip8Screen } from './Chip8Screen';

export class Chip8Processor {
  private memory: Chip8Memory;
  private screen: Chip8Screen;
  private keyboard: Chip8Keyboard;

  // 16 bytes array
  private vRegisters: Uint8Array;

  // 2 bytes value
  private iRegister: number;

  // 1 byte value
  private stackPointer: number;

  // 16 bytes stack
  private stack: Array<number>;

  // 2 bytes value
  private programCounter: number;

  // 1 byte register
  private delayTimer: number;

  // 1 byte register
  private soundTimer: number;

  constructor(chip8: Chip8) {
    this.memory = chip8.getMemory();
    this.screen = chip8.getScreen();
    this.keyboard = chip8.getKeyboard();
    this.setDefaultValues();
  }

  public setDefaultValues(): void {
    this.vRegisters = new Uint8Array(16);
    this.iRegister = 0;
    this.stackPointer = 0;
    this.stack = new Array(16);
    this.programCounter = 0x200;

    this.delayTimer = 0;
    this.soundTimer = 0;
  }

  public processOpCode(opCode: Chip8OpCode): void {
    this.programCounter += 2;
    switch (opCode.getType()) {
      case Chip8OpCodeType.CLS:
        this.screen.clear();
        break;
      case Chip8OpCodeType.RET:
        this.programCounter = this.stack[--this.stackPointer];
        break;
      case Chip8OpCodeType.JP:
        this.programCounter = opCode.getParam(0);
        break;
      case Chip8OpCodeType.CALL:
        this.stack[this.stackPointer] = this.programCounter;
        this.stackPointer++;
        this.programCounter = opCode.getParam(0);
        break;
      case Chip8OpCodeType.SEVxByte:
        if (this.vRegisters[opCode.getParam(0)] === opCode.getParam(1)) {
          this.programCounter += 2;
        }
        break;
      case Chip8OpCodeType.SNEVxByte:
        if (this.vRegisters[opCode.getParam(0)] !== opCode.getParam(1)) {
          this.programCounter += 2;
        }
        break;
      case Chip8OpCodeType.SEVxVy:
        if (this.vRegisters[opCode.getParam(0)] === this.vRegisters[opCode.getParam(1)]) {
          this.programCounter += 2;
        }
        break;
      case Chip8OpCodeType.LDVxByte:
        this.vRegisters[opCode.getParam(0)] = opCode.getParam(1);
        break;
      case Chip8OpCodeType.ADDVxByte:
        this.vRegisters[opCode.getParam(0)] += opCode.getParam(1);
        if (this.vRegisters[opCode.getParam(0)] > 255) {
          this.vRegisters[opCode.getParam(0)] -= 256;
        }
        break;
      case Chip8OpCodeType.LDVxVy:
        this.vRegisters[opCode.getParam(0)] = this.vRegisters[opCode.getParam(1)];
        break;
      case Chip8OpCodeType.ORVxVy:
        this.vRegisters[opCode.getParam(0)] |= this.vRegisters[opCode.getParam(1)];
        break;
      case Chip8OpCodeType.ANDVxVy:
        this.vRegisters[opCode.getParam(0)] &= this.vRegisters[opCode.getParam(1)];
        break;
      case Chip8OpCodeType.XORVxVy:
        this.vRegisters[opCode.getParam(0)] ^= this.vRegisters[opCode.getParam(1)];
        break;
      case Chip8OpCodeType.ADDVxVy:
        const tmp = this.vRegisters[opCode.getParam(0)] + this.vRegisters[opCode.getParam(1)];
        this.vRegisters[opCode.getParam(0)] = tmp & 0xff;
        this.vRegisters[0xf] = +(tmp > 255);
        break;
      case Chip8OpCodeType.SUBVxVy:
        this.vRegisters[0xf] = +(this.vRegisters[opCode.getParam(0)] > this.vRegisters[opCode.getParam(1)]);
        this.vRegisters[opCode.getParam(0)] -= this.vRegisters[opCode.getParam(1)];
        if (this.vRegisters[opCode.getParam(0)] < 0) {
          this.vRegisters[opCode.getParam(0)] += 256;
        }
        break;
      case Chip8OpCodeType.SHRVxVy:
        this.vRegisters[0xf] = this.vRegisters[opCode.getParam(0)] & 0x1;
        this.vRegisters[opCode.getParam(0)] >>= 1;
        break;
      case Chip8OpCodeType.SUBNVxVy:
        this.vRegisters[0xf] = +(this.vRegisters[opCode.getParam(1)] > this.vRegisters[opCode.getParam(0)]);
        this.vRegisters[opCode.getParam(0)] = this.vRegisters[opCode.getParam(1)] - this.vRegisters[opCode.getParam(0)];
        if (this.vRegisters[opCode.getParam(0)] < 0) {
          this.vRegisters[opCode.getParam(0)] += 256;
        }
        break;
      case Chip8OpCodeType.SHLVxVy:
        this.vRegisters[0xf] = this.vRegisters[opCode.getParam(0)] & 0x80;
        this.vRegisters[opCode.getParam(0)] <<= 1;
        if (this.vRegisters[opCode.getParam(0)] > 255) {
          this.vRegisters[opCode.getParam(0)] -= 256;
        }
        break;
      case Chip8OpCodeType.SNEVxVy:
        if (this.vRegisters[opCode.getParam(0)] !== this.vRegisters[opCode.getParam(1)]) {
          this.programCounter += 2;
        }
        break;
      case Chip8OpCodeType.LDIAddr:
        this.iRegister = opCode.getParam(0);
        break;
      case Chip8OpCodeType.JPV0Byte:
        this.programCounter = opCode.getParam(0) + this.vRegisters[0];
        break;
      case Chip8OpCodeType.RNDVxByte:
        this.vRegisters[opCode.getParam(0)] = getRandomIntInclusive(0, 255) & opCode.getParam(1);
        break;
      case Chip8OpCodeType.DRWVxVyNibble:
        this.screen.setUpdated(true);
        const screenLines = this.screen.getLines(
          this.vRegisters[opCode.getParam(0)],
          this.vRegisters[opCode.getParam(1)],
          opCode.getParam(2)
        );
        const memoryLines = new Uint8Array(opCode.getParam(2));
        for (let i = 0; i < opCode.getParam(2); i++) {
          memoryLines[i] = this.memory.get(this.iRegister + i);
        }
        const xoredScreen = new Uint8Array(opCode.getParam(2));
        for (let i = 0; i < opCode.getParam(2); i++) {
          xoredScreen[i] = screenLines[i] ^ memoryLines[i];
        }
        // Collision detection.
        this.vRegisters[0xf] = 0;
        for (let i = 0; i < opCode.getParam(2); i++) {
          if ((screenLines[i] & xoredScreen[i]) !== screenLines[i]) {
            this.vRegisters[0xf] = 1;
            break;
          }
        }
        // Updating screen.
        this.screen.setLines(this.vRegisters[opCode.getParam(0)], this.vRegisters[opCode.getParam(1)], xoredScreen);
        break;
      case Chip8OpCodeType.SKPVx:
        if (this.keyboard.getKey(opCode.getParam(0))) {
          this.programCounter += 2;
        }
        break;
      case Chip8OpCodeType.SKNPVx:
        if (!this.keyboard.getKey(opCode.getParam(0))) {
          this.programCounter += 2;
        }
        break;
      case Chip8OpCodeType.LDVxDT:
        this.vRegisters[opCode.getParam(0)] = this.delayTimer;
        break;
      case Chip8OpCodeType.LDVxK:
        let key;
        for (let i = 0; i < this.keyboard.getKeys().length; i++) {
          if (this.keyboard.getKey(i)) {
            key = i;
            break;
          }
        }
        if (this.keyboard.getKey(opCode.getParam(0))) {
          this.vRegisters[opCode.getParam(0)] = key;
        } else {
          this.programCounter -= 2;
        }
        break;
      case Chip8OpCodeType.LDDTVx:
        this.delayTimer = this.vRegisters[opCode.getParam(0)];
        break;
      case Chip8OpCodeType.LDSTVx:
        this.soundTimer = this.vRegisters[opCode.getParam(0)];
        break;
      case Chip8OpCodeType.ADDIVx:
        this.iRegister += this.vRegisters[opCode.getParam(0)];
        break;
      case Chip8OpCodeType.LDFVx:
        this.iRegister = opCode.getParam(0) * 5;
        break;
      case Chip8OpCodeType.LDBVx:
        // Shift Add-3 Method
        let decimal = this.vRegisters[opCode.getParam(0)];
        let ones = 0;
        let tens = 0;
        let hundreds = 0;
        for (let i = 0; i < 8; i++) {
          if (ones > 4) {
            ones += 3;
          }
          if (tens > 4) {
            tens += 3;
          }
          if (hundreds > 4) {
            hundreds += 3;
          }
          hundreds = ((hundreds << 1) & 0xf) + (tens >> 3);
          tens = ((tens << 1) & 0xf) + (ones >> 3);
          ones = ((ones << 1) & 0xf) + (decimal >> 7);
          decimal = (decimal << 1) & 0xff;
        }
        this.memory.set(this.iRegister, hundreds);
        this.memory.set(this.iRegister + 1, tens);
        this.memory.set(this.iRegister + 2, ones);
        break;
      case Chip8OpCodeType.LDIVx:
        for (let i = 0; i <= opCode.getParam(0); i++) {
          this.memory.set(this.iRegister + i, this.vRegisters[i]);
        }
        break;
      case Chip8OpCodeType.LDVxI:
        for (let i = 0; i <= opCode.getParam(0); i++) {
          this.vRegisters[i] = this.memory.get(this.iRegister + i);
        }
        break;
      default:
    }
  }

  public tick(): void {
    const opCode = (this.memory.get(this.programCounter) << 8) | this.memory.get(this.programCounter + 1);
    this.processOpCode(new Chip8OpCode(opCode));
  }

  public tick60Hz(): void {
    if (this.delayTimer > 0) {
      this.delayTimer--;
    }
    if (this.soundTimer > 0) {
      this.soundTimer--;
    }
  }
}
