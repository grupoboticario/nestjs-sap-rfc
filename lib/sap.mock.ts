/* istanbul ignore file */

import { Injectable } from '@nestjs/common';
import {
  InjectSapClient,
  InjectSapConnectionOptions,
  InjectSapPool,
  InjectSapPoolConnectionOptions,
  InjectSapService,
} from './inject.decorator';
import { SapService } from './services';
import {
  SapClient,
  SapClientConfig,
  SapPool,
  SapPoolConfiguration,
  SapRfcObject,
} from './types';

export const mockSapClient = {
  open: jest.fn(),
  close: jest.fn(),
  call: jest.fn(),
  release: jest.fn(),
};

export const mockRFCName = 'MY_RFC';
export const mockParams = {
  userId: 1,
} as SapRfcObject;

export const mockResult = {
  name: 'my name',
} as SapRfcObject;

export const mockSapPool = {
  acquire: jest.fn().mockResolvedValue(mockSapClient),
};

export const mockSapService = {
  execute: jest.fn(),
};

export const EXPECTED_SERVICE_NAME = 'myService';
export const EXPECTED_POOL_OPTIONS_NAME = `${EXPECTED_SERVICE_NAME.toUpperCase()}_SAP_POOL_CONNECTION_OPTIONS`;
export const EXPECTED_CLIENT_OPTIONS_NAME = `${EXPECTED_SERVICE_NAME.toUpperCase()}_SAP_CONNECTION_OPTIONS`;
export const EXPECTED_POOL_NAME = `${EXPECTED_SERVICE_NAME.toUpperCase()}_SAP_POOL`;
export const EXPECTED_CLIENT_NAME = `${EXPECTED_SERVICE_NAME.toUpperCase()}_SAP_CLIENT`;

export const mockPoolConfiguration: SapPoolConfiguration = {
  connectionParameters: {
    ashost: 'host',
    sysnr: '00',
    user: 'user',
    passwd: 'pass',
    client: '500',
    lang: 'PT',
  },
  poolOptions: {
    low: 1,
    high: 2,
  },
  clientOptions: {
    bcd: 'number',
    date: {
      toABAP: jest.fn(),
      fromABAP: jest.fn(),
    },
  },
};

export const mockClientConfiguration: SapClientConfig = {
  connectionParameters: {
    ashost: 'host',
    sysnr: '00',
    user: 'user',
    passwd: 'pass',
    client: '500',
    lang: 'PT',
  },
  clientOptions: {
    bcd: 'number',
    date: {
      toABAP: jest.fn(),
      fromABAP: jest.fn(),
    },
  },
};

@Injectable()
export class MyPoolConnectionOptions {
  @InjectSapPoolConnectionOptions()
  private readonly options: SapPoolConfiguration;
}

@Injectable()
export class MyPoolConnectionOptionsNamed {
  @InjectSapPoolConnectionOptions(EXPECTED_SERVICE_NAME)
  private readonly options: SapPoolConfiguration;
}

@Injectable()
export class MyConnectionOptions {
  @InjectSapConnectionOptions()
  private readonly options: SapClientConfig;
}

@Injectable()
export class MyConnectionOptionsNamed {
  @InjectSapConnectionOptions(EXPECTED_SERVICE_NAME)
  private readonly options: SapClientConfig;
}

@Injectable()
export class MyPoolService {
  @InjectSapPool()
  private readonly sapPool: SapPool;
}

@Injectable()
export class MyPoolServiceNamed {
  @InjectSapPool(EXPECTED_SERVICE_NAME)
  private readonly sapPool: SapPool;
}

@Injectable()
export class MyClientService {
  @InjectSapClient()
  private readonly sapClient: SapClient;
}

@Injectable()
export class MyClientServiceNamed {
  @InjectSapClient(EXPECTED_SERVICE_NAME)
  private readonly sapClient: SapClient;
}

@Injectable()
export class MyService {
  @InjectSapService()
  private readonly sapService: SapService;
}

@Injectable()
export class MyServiceNamed {
  @InjectSapService(EXPECTED_SERVICE_NAME)
  private readonly sapService: SapService;
}
