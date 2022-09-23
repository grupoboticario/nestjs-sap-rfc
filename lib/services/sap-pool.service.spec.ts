import { Test, TestingModule } from '@nestjs/testing';
import { SAP_POOL } from '../constants';
import {
  mockParams,
  mockResult,
  mockRFCName,
  mockSapClient,
  mockSapPool,
} from '../sap.mock';
import { SapPool } from '../types';
import { SapPoolService } from './sap-pool.service';

describe('SapPoolService', () => {
  let service: SapPoolService;
  let sapPool: SapPool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SapPoolService,
        {
          provide: SAP_POOL,
          useValue: mockSapPool,
        },
      ],
    }).compile();

    service = module.get<SapPoolService>(SapPoolService);
    sapPool = module.get<SapPool>(SAP_POOL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sapPool).toBeDefined();
  });

  it('call RFC', async () => {
    jest.spyOn(mockSapClient, 'call').mockResolvedValue(mockResult);

    expect(await service.execute(mockRFCName, mockParams)).toEqual(mockResult);
    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(1);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
  });
});
