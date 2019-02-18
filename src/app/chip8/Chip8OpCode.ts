export class Chip8OpCode {
  private type: Chip8OpCodeType;
  private opCode: number;
  private params: number[];

  /**
   * @param opCode 2 bytes number
   */
  constructor(opCode: number) {
    this.opCode = opCode;
    this.params = [];
    this.process();
  }

  /**
   * Processing operation code to determine it's type and parameters
   */
  private process(): void {
    switch (this.opCode & 0xf000) {
      case 0x0000:
        switch (this.opCode & 0x0fff) {
          case 0x00e0:
            this.type = Chip8OpCodeType.CLS;
            break;
          case 0x00ee:
            this.type = Chip8OpCodeType.RET;
            break;
          default:
            this.type = Chip8OpCodeType.NONE;
        }
        break;
      case 0x1000:
        this.type = Chip8OpCodeType.JP;
        this.params.push(this.opCode & 0x0fff);
        break;
      case 0x2000:
        this.type = Chip8OpCodeType.CALL;
        this.params.push(this.opCode & 0x0fff);
        break;
      case 0x3000:
        this.type = Chip8OpCodeType.SEVxByte;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push(this.opCode & 0x00ff);
        break;
      case 0x4000:
        this.type = Chip8OpCodeType.SNEVxByte;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push(this.opCode & 0x00ff);
        break;
      case 0x5000:
        this.type = Chip8OpCodeType.SEVxVy;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push((this.opCode & 0x00f0) >> 4);
        break;
      case 0x6000:
        this.type = Chip8OpCodeType.LDVxByte;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push(this.opCode & 0x00ff);
        break;
      case 0x7000:
        this.type = Chip8OpCodeType.ADDVxByte;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push(this.opCode & 0x00ff);
        break;
      case 0x8000:
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push((this.opCode & 0x00f0) >> 4);
        switch (this.opCode & 0x000f) {
          case 0x0000:
            this.type = Chip8OpCodeType.LDVxVy;
            break;
          case 0x0001:
            this.type = Chip8OpCodeType.ORVxVy;
            break;
          case 0x0002:
            this.type = Chip8OpCodeType.ANDVxVy;
            break;
          case 0x0003:
            this.type = Chip8OpCodeType.XORVxVy;
            break;
          case 0x0004:
            this.type = Chip8OpCodeType.ADDVxVy;
            break;
          case 0x0005:
            this.type = Chip8OpCodeType.SUBVxVy;
            break;
          case 0x0006:
            this.type = Chip8OpCodeType.SHRVxVy;
            break;
          case 0x0007:
            this.type = Chip8OpCodeType.SUBNVxVy;
            break;
          case 0x000e:
            this.type = Chip8OpCodeType.SHLVxVy;
            break;
          default:
            this.type = Chip8OpCodeType.NONE;
        }
        break;
      case 0x9000:
        this.type = Chip8OpCodeType.SNEVxVy;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push((this.opCode & 0x00f0) >> 4);
        break;
      case 0xa000:
        this.type = Chip8OpCodeType.LDIAddr;
        this.params.push(this.opCode & 0x0fff);
        break;
      case 0xb000:
        this.type = Chip8OpCodeType.JPV0Byte;
        this.params.push(this.opCode & 0x0fff);
        break;
      case 0xc000:
        this.type = Chip8OpCodeType.RNDVxByte;
        this.params.push((this.opCode & 0x0f00) >> 8);
        break;
      case 0xd000:
        this.type = Chip8OpCodeType.DRWVxVyNibble;
        this.params.push((this.opCode & 0x0f00) >> 8);
        this.params.push((this.opCode & 0x00f0) >> 4);
        this.params.push(this.opCode & 0x000f);
        break;
      case 0xe000:
        this.params.push((this.opCode & 0x0f00) >> 8);
        switch (this.opCode & 0x00ff) {
          case 0x009e:
            this.type = Chip8OpCodeType.SKPVx;
            break;
          case 0x00a1:
            this.type = Chip8OpCodeType.SKNPVx;
            break;
          default:
            this.type = Chip8OpCodeType.NONE;
        }
        break;
      case 0xf000:
        this.params.push((this.opCode & 0x0f00) >> 8);
        switch (this.opCode & 0x00ff) {
          case 0x0007:
            this.type = Chip8OpCodeType.LDVxDT;
            break;
          case 0x000a:
            this.type = Chip8OpCodeType.LDVxK;
            break;
          case 0x0015:
            this.type = Chip8OpCodeType.LDDTVx;
            break;
          case 0x0018:
            this.type = Chip8OpCodeType.LDSTVx;
            break;
          case 0x001e:
            this.type = Chip8OpCodeType.ADDIVx;
            break;
          case 0x0029:
            this.type = Chip8OpCodeType.LDFVx;
            break;
          case 0x0033:
            this.type = Chip8OpCodeType.LDBVx;
            break;
          case 0x0055:
            this.type = Chip8OpCodeType.LDIVx;
            break;
          case 0x0065:
            this.type = Chip8OpCodeType.LDVxI;
            break;
          default:
            this.type = Chip8OpCodeType.NONE;
        }
        break;
      default:
        this.type = Chip8OpCodeType.NONE;
    }
  }

  /**
   * @returns 2 bytes number
   */
  public getOpCode(): number {
    return this.opCode;
  }

  public getParam(position: number): number {
    return this.params[position];
  }

  public getParams(): number[] {
    return this.params;
  }

  public getType(): Chip8OpCodeType {
    return this.type;
  }
}

export enum Chip8OpCodeType {
  CLS = 'CLS',
  RET = 'RET',
  JP = 'JP',
  CALL = 'CALL',
  SEVxByte = 'SEVxByte',
  SNEVxByte = 'SNEVxByte',
  SEVxVy = 'SEVxVy',
  LDVxByte = 'LDVxByte',
  ADDVxByte = 'ADDVxByte',
  LDVxVy = 'LDVxVy',
  ORVxVy = 'ORVxVy',
  ANDVxVy = 'ANDVxVy',
  XORVxVy = 'XORVxVy',
  ADDVxVy = 'ADDVxVy',
  SUBVxVy = 'SUBVxVy',
  SHRVxVy = 'SHRVxVy',
  SUBNVxVy = 'SUBNVxVy',
  SHLVxVy = 'SHLVxVy',
  SNEVxVy = 'SNEVxVy',
  LDIAddr = 'LDIAddr',
  JPV0Byte = 'JPV0Byte',
  RNDVxByte = 'RNDVxByte',
  DRWVxVyNibble = 'DRWVxVyNibble',
  SKPVx = 'SKPVx',
  SKNPVx = 'SKNPVx',
  LDVxDT = 'LDVxDT',
  LDVxK = 'LDVxK',
  LDDTVx = 'LDDTVx',
  LDSTVx = 'LDSTVx',
  ADDIVx = 'ADDIVx',
  LDFVx = 'LDFVx',
  LDBVx = 'LDBVx',
  LDIVx = 'LDIVx',
  LDVxI = 'LDVxI',
  NONE = 'NONE',
}
