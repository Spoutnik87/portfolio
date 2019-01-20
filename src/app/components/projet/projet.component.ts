import { Component, Input } from "@angular/core";

@Component({
  selector: "app-projet",
  templateUrl: "./projet.component.html"
})
export class ProjetComponent {
  @Input()
  title: string;
  @Input()
  technologies: string[];
}
