/* istanbul ignore file */

import { DynamicModule, Module } from '@nestjs/common';
import { Client, Pool } from 'node-rfc';
import {
  SAP_CLIENT,
  SAP_CONNECTION_OPTIONS,
  SAP_POOL,
  SAP_POOL_CONNECTION_OPTIONS,
  SAP_SERVICE,
} from './constants';
import {
  SapModuleAsyncConnectionOptions,
  SapModuleAsyncPoolConnectionOptions,
  SapModuleConnectionOptions,
  SapModulePoolConnectionOptions,
} from './sap.interface';
import { SapClientService } from './services';
import { SapPoolService } from './services/sap-pool.service';

@Module({})
export class SapModule {
  static createPool(options: SapModulePoolConnectionOptions) {
    const poolConnectionOptions = {
      provide: SAP_POOL_CONNECTION_OPTIONS,
      useValue: options,
    };

    const poolProvider = {
      provide: SAP_POOL,
      useValue: new Pool(options),
    };

    const serviceProvider = {
      provide: options.name || SAP_SERVICE,
      useClass: SapPoolService,
    };

    return {
      module: SapModule,
      global: options.isGlobal,
      providers: [
        SapPoolService,
        poolConnectionOptions,
        poolProvider,
        serviceProvider,
      ],
      exports: [
        SapPoolService,
        poolConnectionOptions,
        poolProvider,
        serviceProvider,
      ],
    };
  }

  static createPoolAsync(
    options: SapModuleAsyncPoolConnectionOptions,
  ): DynamicModule {
    const poolConnectionOptions = {
      provide: SAP_POOL_CONNECTION_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const poolProvider = {
      provide: SAP_POOL,
      useFactory: (opts: SapModulePoolConnectionOptions) => new Pool(opts),
      inject: [SAP_POOL_CONNECTION_OPTIONS],
    };

    const serviceProvider = {
      provide: options.name || SAP_SERVICE,
      useClass: SapPoolService,
    };

    return {
      module: SapModule,
      global: options.isGlobal,
      imports: options.imports,
      providers: [
        SapPoolService,
        poolConnectionOptions,
        poolProvider,
        serviceProvider,
      ],
      exports: [
        SapPoolService,
        poolConnectionOptions,
        poolProvider,
        serviceProvider,
      ],
    };
  }

  static createClient(options: SapModuleConnectionOptions) {
    const connectionOptions = {
      provide: SAP_CONNECTION_OPTIONS,
      useValue: options,
    };

    const clientProvider = {
      provide: SAP_CLIENT,
      useValue: new Client(options),
    };

    const serviceProvider = {
      provide: options.name || SAP_SERVICE,
      useClass: SapClientService,
    };

    return {
      module: SapModule,
      global: options.isGlobal,
      providers: [connectionOptions, clientProvider, serviceProvider],
      exports: [connectionOptions, clientProvider, serviceProvider],
    };
  }

  static createClientAsync(
    options: SapModuleAsyncConnectionOptions,
  ): DynamicModule {
    const connectionOptions = {
      provide: SAP_CONNECTION_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const clientProvider = {
      provide: SAP_CLIENT,
      useFactory: (opts: SapModuleConnectionOptions) => new Client(opts),
      inject: [SAP_CONNECTION_OPTIONS],
    };

    const serviceProvider = {
      provide: options.name || SAP_SERVICE,
      useClass: SapClientService,
    };

    return {
      module: SapModule,
      global: options.isGlobal,
      imports: options.imports,
      providers: [connectionOptions, clientProvider, serviceProvider],
      exports: [connectionOptions, clientProvider, serviceProvider],
    };
  }
}
