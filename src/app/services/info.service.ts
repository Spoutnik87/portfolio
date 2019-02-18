import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoModel } from '../models/info.model';
import { ConfigService } from './config.service';

@Injectable()
export class InfoService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  public getInfo() {
    return this.httpClient.get(this.configService.getUrl() + '/assets/info.json') as Observable<InfoModel>;
  }
}
