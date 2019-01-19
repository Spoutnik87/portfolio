import { Chip8Processor } from "./Chip8Processor";
import { Chip8Memory } from "./Chip8Memory";
import { Chip8Screen } from "./Chip8Screen";
import { Chip8Program } from "./Chip8Program";
import { Chip8Keyboard } from "./Chip8Keyboard";
import { sleep } from "./functions";

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
    const targetElapsedTime = 20;
    // this.loop();

    while (this.running) {
      currentTime = Date.now() - startTime;
      // console.log("currentTime " + currentTime);
      let elapsedTime = currentTime - lastTime;
      // console.log("elapsedTime " + elapsedTime);

      while (elapsedTime >= targetElapsedTime60Hz) {
        // console.log("elapsedTime " + elapsedTime);
        // console.log("targetElapsedTime60Hz " + targetElapsedTime60Hz);
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

  /*public loop() {
    this.currentTime = Date.now() - this.startTime;
    let elapsedTime = this.currentTime - this.lastTime;

    while (elapsedTime >= this.targetElapsedTime60Hz) {
      this.processor.tick60Hz();
      this.updateScreen();
      elapsedTime -= this.targetElapsedTime60Hz;
      this.lastTime += this.targetElapsedTime60Hz;
    }

    this.processor.tick();
    if (this.running) {
      setInterval(this.loop, this.targetElapsedTime);
    }
  }*/

  public updateScreen() {
    const scale = 8;
    this.context.clearRect(0, 0, 64 * scale, 32 * scale);
    // Draw pixel by pixel.
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 64; x++) {
        if (this.screen.get(x, y)) {
          this.context.fillStyle = "#000000";
        } else {
          this.context.fillStyle = "#D3D3D3";
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
