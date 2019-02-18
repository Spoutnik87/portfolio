import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Chip8Program } from '../chip8/Chip8Program';
import { ConfigService } from './config.service';

@Injectable()
export class Chip8Service {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  public getProgram(name: string) {
    const f = new FileReader();
    return this.httpClient
      .get(this.configService.getUrl() + '/assets/' + name, {
        responseType: 'blob',
      })
      .pipe(
        switchMap(response => {
          f.readAsArrayBuffer(response);
          return fromEvent(f, 'loadend');
        }),
        map(event => {
          const srcElem = event.srcElement as any;
          return new Chip8Program(name, new Uint8Array(srcElem.result));
        })
      ) as Observable<Chip8Program>;
  }
}
