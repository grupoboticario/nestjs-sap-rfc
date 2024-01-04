/* istanbul ignore file */

import { DynamicModule, Module } from '@nestjs/common';
import { Client, Pool, RfcClientConfig } from 'node-rfc';
import {
  SAP_CLIENT,
  SAP_CONNECTION_OPTIONS,
  SAP_POOL,
  SAP_POOL_CONNECTION_OPTIONS,
  SAP_SERVICE,
} from './constants';
import { createToken } from './create-token';
import {
  SapModuleAsyncConnectionOptions,
  SapModuleAsyncPoolConnectionOptions,
  SapModuleConnectionOptions,
  SapModulePoolConnectionOptions,
} from './sap.interface';
import { SapClientService, SapPoolService } from './services';

@Module({})
export class SapModule {
  static createPool(options: SapModulePoolConnectionOptions) {
    const { name, isGlobal, ...poolConfiguration } = options;

    const poolConnectionOptions = {
      provide: createToken(name, SAP_POOL_CONNECTION_OPTIONS),
      useValue: poolConfiguration,
    };

    const poolProvider = {
      provide: createToken(name, SAP_POOL),
      useValue: new Pool(poolConfiguration),
    };

    const serviceProvider = {
      provide: name || SAP_SERVICE,
      useClass: SapPoolService,
    };

    return {
      module: SapModule,
      global: isGlobal,
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
    const poolConnectionOptionsToken = createToken(
      options.name,
      SAP_POOL_CONNECTION_OPTIONS,
    );

    const poolConnectionOptions = {
      provide: poolConnectionOptionsToken,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const poolProvider = {
      provide: createToken(options.name, SAP_POOL),
      useFactory: (opts: SapModulePoolConnectionOptions) => new Pool(opts),
      inject: [poolConnectionOptionsToken],
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
    const { name, isGlobal, connectionParameters, clientOptions } = options;

    const clientConfiguration = {
      connectionParameters,
      clientOptions,
    } as RfcClientConfig;

    const connectionOptions = {
      provide: createToken(name, SAP_CONNECTION_OPTIONS),
      useValue: clientConfiguration,
    };

    const clientProvider = {
      provide: createToken(name, SAP_CLIENT),
      useValue: new Client(connectionParameters, clientOptions),
    };

    const serviceProvider = {
      provide: name || SAP_SERVICE,
      useClass: SapClientService,
    };

    return {
      module: SapModule,
      global: isGlobal,
      providers: [connectionOptions, clientProvider, serviceProvider],
      exports: [connectionOptions, clientProvider, serviceProvider],
    };
  }

  static createClientAsync(
    options: SapModuleAsyncConnectionOptions,
  ): DynamicModule {
    const connectionOptionsToken = createToken(
      options.name,
      SAP_CONNECTION_OPTIONS,
    );

    const connectionOptions = {
      provide: connectionOptionsToken,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const clientProvider = {
      provide: createToken(options.name, SAP_CLIENT),
      useFactory: (opts: SapModuleConnectionOptions) =>
        new Client(opts?.connectionParameters, opts?.clientOptions),
      inject: [connectionOptionsToken],
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
