import { Component } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
})
export class PresentationComponent {
  faLinkedin = faLinkedin;
  faMapMarkerAlt = faMapMarkerAlt;
  faGithub = faGithub;
  faUserAlt = faUserAlt;
  faEnvelope = faEnvelope;
}
