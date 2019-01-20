import { Component } from "@angular/core";
import {
  faCode,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-projets",
  templateUrl: "./projets.component.html"
})
export class ProjetsComponent {
  faCode = faCode;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(private router: Router) {}

  redirectToChip8() {
    this.router.navigateByUrl("/chip8");
  }

  redirectToEnchere() {
    document.location.href =
      "http://www.pigeons-voyageurs-12r.com/enchere/index.php";
  }
}
