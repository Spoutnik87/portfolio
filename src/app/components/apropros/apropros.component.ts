import { Component, OnDestroy, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { InfoService } from 'src/app/services';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
})
export class AProposComponent implements OnInit, OnDestroy {
  faQuestion = faQuestion;
  faGithub = faGithub;
  technologies = ['angular', 'nodejs', 'html', 'css'];
  technologiesDepl = ['jenkins'];

  subscription: Subscription;
  infoExists = false;
  buildDate;
  buildNumber;

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.subscription = this.infoService.getInfo().subscribe(
      result => {
        this.buildDate = result.build.date;
        this.buildNumber = result.build.number;
        this.infoExists = true;
      },
      () => {}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
