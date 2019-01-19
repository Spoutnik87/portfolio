import { Component } from "@angular/core";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.css"]
})
export class PresentationComponent {
  faLinkedin = faLinkedin;
  faMapMarkerAlt = faMapMarkerAlt;
  faGithub = faGithub;
}
