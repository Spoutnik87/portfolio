import {
  Component,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnDestroy
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Chip8 } from "src/app/chip8/Chip8";
import { Chip8Program } from "src/app/chip8/Chip8Program";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { ConfigService } from "src/app/services";

@Component({
  selector: "app-chip8",
  templateUrl: "./chip8.component.html",
  styleUrls: ["./chip8.component.css"]
})
export class Chip8Component implements AfterViewInit, OnDestroy {
  faCode = faCode;
  isBrowser: boolean;

  @ViewChild("screen")
  screenCanvas;

  context: CanvasRenderingContext2D;

  screenInitialized = false;

  chip8: Chip8;
  program: Chip8Program;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const canvas = this.screenCanvas.nativeElement;
      this.context = canvas.getContext("2d");
      this.screenInitialized = true;

      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        this.configService.getUrl() + "/assets/Chip8 Picture.ch8",
        true
      );
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        this.program = new Chip8Program(new Uint8Array(xhr.response));
      };
      xhr.send();
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

  selectProgram(name: string) {}
}
