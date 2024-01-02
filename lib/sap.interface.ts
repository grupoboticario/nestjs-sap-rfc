import { ModuleMetadata } from '@nestjs/common/interfaces';
import { RfcClientConfig, RfcPoolConfiguration } from 'node-rfc';

export interface SapModulePoolConnectionOptions extends RfcPoolConfiguration {
  isGlobal?: boolean;
  name?: string;
}

export interface SapModuleConnectionOptions extends RfcClientConfig {
  isGlobal?: boolean;
  name?: string;
}

export interface SapModuleAsyncPoolConnectionOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  isGlobal?: boolean;
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<RfcPoolConfiguration> | RfcPoolConfiguration;
}

export interface SapModuleAsyncConnectionOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  isGlobal?: boolean;
  name?: string;
  useFactory?: (...args: any[]) => Promise<RfcClientConfig> | RfcClientConfig;
}
