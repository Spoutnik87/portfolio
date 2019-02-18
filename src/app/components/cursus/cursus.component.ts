import { Component } from '@angular/core';
import { faCalendarAlt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cursus',
  templateUrl: './cursus.component.html',
})
export class CursusComponent {
  faGraduationCap = faGraduationCap;
  faCalendarAlt = faCalendarAlt;
}
