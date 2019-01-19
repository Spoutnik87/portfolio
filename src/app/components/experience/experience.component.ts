import { Component } from "@angular/core";
import { faBriefcase, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.css"]
})
export class ExperienceComponent {
  faBriefcase = faBriefcase;
  faCalendarAlt = faCalendarAlt;
}
