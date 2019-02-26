import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Chip8 } from 'src/app/chip8/Chip8';
import { Chip8Program } from 'src/app/chip8/Chip8Program';
import { Chip8Service } from 'src/app/services/chip8.service';

@Component({
  selector: 'app-chip8',
  templateUrl: './chip8.component.html',
  styleUrls: ['./chip8.component.css'],
})
export class Chip8Component implements AfterViewInit, OnDestroy {
  faCode = faCode;
  isBrowser: boolean;

  @ViewChild('screen')
  screenCanvas;

  context: CanvasRenderingContext2D;

  screenInitialized = false;

  chip8: Chip8;
  program: Chip8Program;

  selectedProgram: string;
  programs = [
    {
      name: 'Chip8 Picture',
      file: 'Chip8 Picture.ch8',
    },
    {
      name: 'IBM Logo',
      file: 'IBM Logo.ch8',
    },
    {
      name: 'Pong',
      file: 'Pong.ch8',
    },
    {
      name: 'demo',
      file: 'demo.ch8',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private chip8Service: Chip8Service) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onChange(value) {
    this.loadProgram(value);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const canvas = this.screenCanvas.nativeElement;
      this.context = canvas.getContext('2d');
      this.screenInitialized = true;
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.stopEmulator();
    }
  }

  startEmulator() {
    if (this.chip8 == null && this.program != null) {
      this.chip8 = new Chip8(this.context);
      (() => {
        this.chip8.start(this.program);
      })();
    }
  }

  stopEmulator() {
    if (this.chip8 != null) {
      this.chip8.stop();
      this.chip8 = undefined;
    }
  }

  loadProgram(name: string) {
    this.stopEmulator();
    this.chip8Service.getProgram(name).subscribe(program => {
      this.program = program;
    });
  }
}
