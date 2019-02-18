import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
})
export class TechnologiesComponent {
  @Input()
  names: string[];
}
