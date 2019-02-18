import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
})
export class ProjetsComponent {
  faCode = faCode;

  constructor(private router: Router) {}

  redirectToChip8() {
    this.router.navigateByUrl('/chip8');
  }
}
