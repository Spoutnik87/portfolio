import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { fadeAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;

  sidebarState = 'C';

  innerWidth;

  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
      setTimeout(() => {
        this.refreshSidebar(true);
      }, 500);
    } else {
      this.innerWidth = 0;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
    this.refreshSidebar();
  }

  refreshSidebar(firstInit: boolean = false) {
    if (this.innerWidth > 768) {
      if (this.sidebarState === 'C') {
        if (firstInit) {
          this.sidebarState = 'A';
        } else {
          this.sidebarState = 'B';
        }
      } else if (this.sidebarState === 'B') {
        this.sidebarState = 'A';
      }
    } else {
      if (this.sidebarState === 'A') {
        this.sidebarState = 'B';
      } else if (this.sidebarState === 'C' && firstInit) {
        this.sidebarState = 'B';
      }
    }
  }

  updateSidebar() {
    if (this.sidebarState === 'A') {
      if (this.innerWidth > 768) {
        this.sidebarState = 'B';
      } else {
        this.sidebarState = 'B';
      }
    } else if (this.sidebarState === 'B') {
      if (this.innerWidth > 768) {
        this.sidebarState = 'A';
      } else {
        this.sidebarState = 'C';
      }
    } else {
      if (this.innerWidth > 768) {
        this.sidebarState = 'A';
      } else {
        this.sidebarState = 'B';
      }
    }
  }
}
