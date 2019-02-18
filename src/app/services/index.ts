import { Chip8Service } from './chip8.service';
import { ConfigService } from './config.service';
import { InfoService } from './info.service';

export const services: any[] = [ConfigService, InfoService, Chip8Service];

export * from './config.service';
export * from './info.service';
export * from './chip8.service';
