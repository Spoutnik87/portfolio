import { Component, OnInit, OnDestroy } from "@angular/core";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { InfoService } from "src/app/services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-apropos",
  templateUrl: "./apropos.component.html"
})
export class AProposComponent implements OnInit, OnDestroy {
  faQuestion = faQuestion;
  technologies = ["angular", "nodejs", "html", "css"];
  technologiesDepl = ["jenkins"];

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
