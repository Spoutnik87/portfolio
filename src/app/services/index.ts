import { ConfigService } from "./config.service";
import { InfoService } from "./info.service";

export const services: any[] = [ConfigService, InfoService];

export * from "./config.service";
export * from "./info.service";
