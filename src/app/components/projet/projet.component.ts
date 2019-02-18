import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
})
export class ProjetComponent {
  faArrowAltCircleRight = faArrowAltCircleRight;
  faGithub = faGithub;

  @Input()
  title: string;
  @Input()
  repository: string;
  @Output()
  view = new EventEmitter();
  @Input()
  technologies: string[];
  @Input()
  viewEnabled = false;

  onView() {
    this.view.emit();
  }
}
