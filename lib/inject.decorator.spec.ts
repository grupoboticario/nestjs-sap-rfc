import { Test, TestingModule } from '@nestjs/testing';
import {
  SAP_CLIENT,
  SAP_CONNECTION_OPTIONS,
  SAP_POOL,
  SAP_POOL_CONNECTION_OPTIONS,
  SAP_SERVICE,
} from './constants';
import { createToken } from './create-token';
import {
  EXPECTED_CLIENT_NAME,
  EXPECTED_CLIENT_OPTIONS_NAME,
  EXPECTED_POOL_NAME,
  EXPECTED_POOL_OPTIONS_NAME,
  EXPECTED_SERVICE_NAME,
  MyClientService,
  MyClientServiceNamed,
  MyConnectionOptions,
  MyConnectionOptionsNamed,
  MyPoolConnectionOptions,
  MyPoolConnectionOptionsNamed,
  MyPoolService,
  MyPoolServiceNamed,
  MyService,
  MyServiceNamed,
  mockClientConfiguration,
  mockPoolConfiguration,
  mockSapClient,
  mockSapPool,
  mockSapService,
} from './sap.mock';
import { SapService } from './services';
import {
  SapClient,
  SapClientConfig,
  SapPool,
  SapPoolConfiguration,
} from './types';

describe('InjectDecorators', () => {
  let poolConfiguration: SapPoolConfiguration;
  let poolConfigurationNamed: SapPoolConfiguration;
  let clientConfiguration: SapClientConfig;
  let clientConfigurationNamed: SapClientConfig;
  let poolService: SapPool;
  let poolServiceNamed: SapPool;
  let clientService: SapClient;
  let clientServiceNamed: SapClient;
  let service: SapService;
  let serviceNamed: SapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyPoolConnectionOptions,
        MyPoolConnectionOptionsNamed,
        MyConnectionOptions,
        MyConnectionOptionsNamed,
        MyPoolService,
        MyPoolServiceNamed,
        MyClientService,
        MyClientServiceNamed,
        MyService,
        MyServiceNamed,
        {
          provide: SAP_POOL_CONNECTION_OPTIONS,
          useValue: mockPoolConfiguration,
        },
        {
          provide: createToken(
            EXPECTED_SERVICE_NAME,
            SAP_POOL_CONNECTION_OPTIONS,
          ),
          useValue: mockPoolConfiguration,
        },
        {
          provide: SAP_CONNECTION_OPTIONS,
          useValue: mockClientConfiguration,
        },
        {
          provide: createToken(EXPECTED_SERVICE_NAME, SAP_CONNECTION_OPTIONS),
          useValue: mockClientConfiguration,
        },
        {
          provide: SAP_CLIENT,
          useValue: mockSapClient,
        },
        {
          provide: createToken(EXPECTED_SERVICE_NAME, SAP_CLIENT),
          useValue: mockSapClient,
        },
        {
          provide: SAP_POOL,
          useValue: mockSapPool,
        },
        {
          provide: createToken(EXPECTED_SERVICE_NAME, SAP_POOL),
          useValue: mockSapPool,
        },
        {
          provide: SAP_SERVICE,
          useValue: mockSapService,
        },
        {
          provide: EXPECTED_SERVICE_NAME,
          useValue: mockSapService,
        },
      ],
    }).compile();

    poolConfiguration = module.get<SapPoolConfiguration>(
      SAP_POOL_CONNECTION_OPTIONS,
    );
    poolConfigurationNamed = module.get<SapPoolConfiguration>(
      EXPECTED_POOL_OPTIONS_NAME,
    );
    clientConfiguration = module.get<SapClientConfig>(SAP_CONNECTION_OPTIONS);
    clientConfigurationNamed = module.get<SapClientConfig>(
      EXPECTED_CLIENT_OPTIONS_NAME,
    );
    poolService = module.get<SapPool>(SAP_POOL);
    poolServiceNamed = module.get<SapPool>(EXPECTED_POOL_NAME);
    clientService = module.get<SapClient>(SAP_CLIENT);
    clientServiceNamed = module.get<SapClient>(EXPECTED_CLIENT_NAME);
    service = module.get<SapService>(SAP_SERVICE);
    serviceNamed = module.get<SapService>(EXPECTED_SERVICE_NAME);
  });

  it('should be pool configuration defined', () => {
    expect(poolConfiguration).toBeDefined();
    expect(poolConfigurationNamed).toBeDefined();
  });

  it('should be SapPoolConfiguration', () => {
    expect(poolConfiguration).toBe(mockPoolConfiguration);
    expect(poolConfigurationNamed).toBe(mockPoolConfiguration);
  });

  it('should be client configuration defined', () => {
    expect(clientConfiguration).toBeDefined();
    expect(clientConfigurationNamed).toBeDefined();
  });

  it('should be SapClientConfig', () => {
    expect(clientConfiguration).toBe(mockClientConfiguration);
    expect(clientConfigurationNamed).toBe(mockClientConfiguration);
  });

  it('should be pool service defined', () => {
    expect(poolService).toBeDefined();
    expect(poolServiceNamed).toBeDefined();
  });

  it('should be SapPool.acquire a Function', () => {
    expect(poolService.acquire).toEqual(expect.any(Function));
    expect(poolServiceNamed.acquire).toEqual(expect.any(Function));
  });

  it('should be client service defined', () => {
    expect(clientService).toBeDefined();
    expect(clientServiceNamed).toBeDefined();
  });

  it('should be SapClient.call a Function', () => {
    expect(clientService.call).toEqual(expect.any(Function));
    expect(clientServiceNamed.call).toEqual(expect.any(Function));
  });

  it('should be service defined', () => {
    expect(service).toBeDefined();
    expect(serviceNamed).toBeDefined();
  });

  it('should be SapService.execute a Function', () => {
    expect(service.execute).toEqual(expect.any(Function));
    expect(serviceNamed.execute).toEqual(expect.any(Function));
  });
});
