import { Component } from "@angular/core";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-langues",
  templateUrl: "./langues.component.html",
  styleUrls: ["./langues.component.css"]
})
export class LanguesComponent {
  faGlobeAmericas = faGlobeAmericas;
}
