import { Component, Input } from '@angular/core';
import { faBriefcase, faCode, faGraduationCap, faQuestion, faTasks, faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  faUserAlt = faUserAlt;
  faGraduationCap = faGraduationCap;
  faTasks = faTasks;
  faBriefcase = faBriefcase;
  faCode = faCode;
  faQuestion = faQuestion;

  /**
   * State A : Full sidebar
   * State B : Minimal sidebar
   * State C : Hidden sidebar
   */
  @Input()
  state: string;

  @Input()
  innerWidth;
}
