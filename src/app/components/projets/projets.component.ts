import { Component } from "@angular/core";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-projets",
  templateUrl: "./projets.component.html"
})
export class ProjetsComponent {
  faCode = faCode;

  constructor(private router: Router) {}

  redirectToChip8() {
    this.router.navigateByUrl("/chip8");
  }
}
