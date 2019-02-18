import { Chip8Keyboard } from './Chip8Keyboard';
import { Chip8Memory } from './Chip8Memory';
import { Chip8Processor } from './Chip8Processor';
import { Chip8Program } from './Chip8Program';
import { Chip8Screen } from './Chip8Screen';
import { sleep } from './functions';

export class Chip8 {
  private processor: Chip8Processor;
  private memory: Chip8Memory;
  private screen: Chip8Screen;
  private keyboard: Chip8Keyboard;

  private running: boolean;

  private context: CanvasRenderingContext2D;

  startTime: number;
  currentTime: number;
  lastTime: number;
  readonly targetElapsedTime60Hz = 1000 / 60;
  readonly targetElapsedTime = 20;

  constructor(context: CanvasRenderingContext2D) {
    this.memory = new Chip8Memory();
    this.screen = new Chip8Screen();
    this.keyboard = new Chip8Keyboard();
    this.processor = new Chip8Processor(this);
    this.context = context;

    this.running = false;
  }

  public getProcessor(): Chip8Processor {
    return this.processor;
  }

  public getMemory(): Chip8Memory {
    return this.memory;
  }

  public getScreen(): Chip8Screen {
    return this.screen;
  }

  public getKeyboard(): Chip8Keyboard {
    return this.keyboard;
  }

  public async start(program: Chip8Program) {
    this.memory.load(program);
    this.running = true;
    const startTime = Date.now();
    let currentTime = Date.now();
    let lastTime = 0;
    const targetElapsedTime60Hz = 1000 / 60;

    while (this.running) {
      currentTime = Date.now() - startTime;
      let elapsedTime = currentTime - lastTime;

      while (elapsedTime >= targetElapsedTime60Hz) {
        this.processor.tick60Hz();
        if (this.screen.isUpdateNeeded()) {
          this.updateScreen();
          this.screen.setUpdated(false);
        }
        elapsedTime -= targetElapsedTime60Hz;
        lastTime += targetElapsedTime60Hz;
      }

      this.processor.tick();
      await sleep(this.targetElapsedTime);
    }
  }

  public updateScreen() {
    const scale = 8;
    this.context.clearRect(0, 0, 64 * scale, 32 * scale);
    // Draw pixel by pixel.
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 64; x++) {
        if (this.screen.get(x, y)) {
          this.context.fillStyle = '#000000';
        } else {
          this.context.fillStyle = '#808080';
        }
        this.context.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  public stop(): void {
    this.running = false;
    this.memory.clear();
  }
}
