import { Component, Input } from "@angular/core";

@Component({
  selector: "app-projet",
  templateUrl: "./projet.component.html",
  styleUrls: ["./projet.component.css"]
})
export class ProjetComponent {
  @Input()
  title: string;
  @Input()
  technologies: string[];
}
