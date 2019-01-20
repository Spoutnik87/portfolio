import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  faPhp,
  faNodeJs,
  faAngular,
  faReact,
  faJenkins,
  faJava,
  faDocker,
  faHtml5,
  faCss3,
  faAndroid,
  faJs,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons";

import { faDatabase } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-technology",
  templateUrl: "./technology.component.html",
  styleUrls: ["./technology.component.css"]
})
export class TechnologyComponent implements OnChanges {
  @Input()
  name: string;

  faIcon: IconDefinition;

  techName: string;

  ngOnChanges(changes: SimpleChanges) {
    switch (changes.name.currentValue) {
      case "php":
        this.faIcon = faPhp;
        this.techName = "PHP";
        break;
      case "nodejs":
        this.faIcon = faNodeJs;
        this.techName = "NodeJS";
        break;
      case "angular":
        this.faIcon = faAngular;
        this.techName = "Angular";
        break;
      case "react":
        this.faIcon = faReact;
        this.techName = "React";
        break;
      case "jenkins":
        this.faIcon = faJenkins;
        this.techName = "Jenkins";
        break;
      case "java":
        this.faIcon = faJava;
        this.techName = "Java";
        break;
      case "docker":
        this.faIcon = faDocker;
        this.techName = "Docker";
        break;
      case "html":
        this.faIcon = faHtml5;
        this.techName = "HTML5";
        break;
      case "css":
        this.faIcon = faCss3;
        this.techName = "CSS3";
        break;
      case "android":
        this.faIcon = faAndroid;
        this.techName = "Android";
        break;
      case "mongodb":
        this.faIcon = faDatabase;
        this.techName = "MongoDB";
        break;
      case "mysql":
        this.faIcon = faDatabase;
        this.techName = "MySQL";
        break;
      case "javascript":
        this.faIcon = faJs;
        this.techName = "Javascript";
        break;
    }
  }
}
