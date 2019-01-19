import { Component } from "@angular/core";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-competences",
  templateUrl: "./competences.component.html",
  styleUrls: ["./competences.component.css"]
})
export class CompetencesComponent {
  faTasks = faTasks;
}
