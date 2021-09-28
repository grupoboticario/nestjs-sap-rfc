import { Test, TestingModule } from '@nestjs/testing';
import { SAP_CLIENT, SAP_POOL, SAP_SERVICE } from './constants';
import {
  mockSapClient,
  mockSapPool,
  mockSapService,
  MyClientService,
  MyPoolService,
  MyService,
} from './sap.mock';

describe('InjectDecorators', () => {
  let poolService: MyPoolService;
  let clientService: MyClientService;
  let service: MyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyPoolService,
        MyClientService,
        MyService,
        {
          provide: SAP_CLIENT,
          useValue: mockSapClient,
        },
        {
          provide: SAP_POOL,
          useValue: mockSapPool,
        },
        {
          provide: SAP_SERVICE,
          useValue: mockSapService,
        },
      ],
    }).compile();

    poolService = module.get<MyPoolService>(MyPoolService);
    clientService = module.get<MyClientService>(MyClientService);
    service = module.get<MyService>(MyService);
  });

  it('should be pool service defined', () => {
    expect(poolService).toBeDefined();
  });

  it('should be client service defined', () => {
    expect(clientService).toBeDefined();
  });

  it('should be service defined', () => {
    expect(service).toBeDefined();
  });
});
