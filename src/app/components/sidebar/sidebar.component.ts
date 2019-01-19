import { Component, Input } from "@angular/core";
import {
  faUserAlt,
  faGraduationCap,
  faBookOpen,
  faBriefcase,
  faCode,
  faPaperPlane,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
  faUserAlt = faUserAlt;
  faGraduationCap = faGraduationCap;
  faBookOpen = faBookOpen;
  faBriefcase = faBriefcase;
  faCode = faCode;
  faPaperPlane = faPaperPlane;
  faQuestion = faQuestion;

  @Input()
  state: string;

  @Input()
  innerWidth;
}
