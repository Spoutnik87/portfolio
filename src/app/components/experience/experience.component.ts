import { Component } from "@angular/core";
import { faBriefcase, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html"
})
export class ExperienceComponent {
  faBriefcase = faBriefcase;
  faCalendarAlt = faCalendarAlt;

  redirectToEnchere() {
    document.location.href =
      "http://www.pigeons-voyageurs-12r.com/enchere/index.php";
  }
}
