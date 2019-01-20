import { Component } from "@angular/core";
import {
  faGraduationCap,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-cursus",
  templateUrl: "./cursus.component.html",
  styleUrls: ["./cursus.component.css"]
})
export class CursusComponent {
  faGraduationCap = faGraduationCap;
  faCalendarAlt = faCalendarAlt;
}
