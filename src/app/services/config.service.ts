import { environment } from '../../environments/environment';

export class ConfigService {
  getUrl(): string {
    return environment.url;
  }

  isProduction(): boolean {
    return environment.production;
  }
}
