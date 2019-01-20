import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";
import { InfoModel } from "../models/info.model";

@Injectable()
export class InfoService {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {}

  public getInfo() {
    return this.httpClient.get(
      this.configService.getUrl() + "/assets/info.json"
    ) as Observable<InfoModel>;
  }
}
