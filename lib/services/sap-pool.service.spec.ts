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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sapPool).toBeDefined();
  });

  it('SAP_POOL is initialized correctly', () => {
    expect(sapPool).toEqual(mockSapPool);
  });

  it('call RFC successfully', async () => {
    jest.spyOn(mockSapClient, 'call').mockResolvedValue(mockResult);

    expect(await service.execute(mockRFCName, mockParams)).toEqual(mockResult);
    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(1);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
  });

  it('call RFC with valid parameters', async () => {
    jest.spyOn(mockSapClient, 'call').mockResolvedValue(mockResult);

    const result = await service.execute(mockRFCName, mockParams);
    expect(result).toEqual(mockResult);
    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(1);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
  });

  it('throws an error when call RFC fails', async () => {
    jest
      .spyOn(mockSapClient, 'call')
      .mockRejectedValue(new Error('Call failed'));

    await expect(service.execute(mockRFCName, mockParams)).rejects.toThrow(
      'Call failed',
    );

    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(1);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
  });
});
