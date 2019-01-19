import {
  Component,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { fadeAnimation } from "./animation";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;

  sidebarState = "A";

  innerWidth;

  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
    } else {
      this.innerWidth = 0;
    }
    if (this.innerWidth > 768) {
      if (this.sidebarState === "C") {
        this.sidebarState = "B";
      } else if (this.sidebarState === "B") {
        this.sidebarState = "A";
      }
    } else {
      if (this.sidebarState === "A") {
        this.sidebarState = "B";
      }
    }
  }

  @HostListener("window:resize")
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 768) {
      if (this.sidebarState === "C") {
        this.sidebarState = "B";
      } else if (this.sidebarState === "B") {
        this.sidebarState = "A";
      }
    } else {
      if (this.sidebarState === "A") {
        this.sidebarState = "B";
      }
    }
  }

  updateSidebar() {
    if (this.sidebarState === "A") {
      if (this.innerWidth > 768) {
        this.sidebarState = "B";
      } else {
        this.sidebarState = "B";
      }
    } else if (this.sidebarState === "B") {
      if (this.innerWidth > 768) {
        this.sidebarState = "A";
      } else {
        this.sidebarState = "C";
      }
    } else {
      if (this.innerWidth > 768) {
        this.sidebarState = "A";
      } else {
        this.sidebarState = "B";
      }
    }
  }
}
