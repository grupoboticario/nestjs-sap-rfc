import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BAPI_TRANSACTION_COMMIT,
  BAPI_TRANSACTION_ROLLBACK,
  SAP_POOL,
} from '../constants';
import {
  mockParams,
  mockRFCName,
  mockResult,
  mockSapClient,
  mockSapPool,
} from '../sap.mock';
import { SapClient, SapPool } from '../types';
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

  it('should be SAP_POOL initialized correctly', () => {
    expect(sapPool).toEqual(mockSapPool);
  });

  it('should be call RFC successfully', async () => {
    jest.spyOn(mockSapClient, 'call').mockResolvedValue(mockResult);

    expect(await service.execute(mockRFCName, mockParams)).toEqual(mockResult);
    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(1);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
  });

  it('should be call RFC with valid parameters', async () => {
    jest.spyOn(mockSapClient, 'call').mockResolvedValue(mockResult);

    const result = await service.execute(mockRFCName, mockParams, {
      timeout: 1000,
    });
    expect(result).toEqual(mockResult);
    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(1);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams, {
      timeout: 1000,
    });
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

  it('should be call auto commit transaction successfully', async () => {
    jest.spyOn(mockSapClient, 'call').mockResolvedValue(mockResult);

    const result = await service.transaction(async (sapClient: SapClient) => {
      const response = await sapClient.call(mockRFCName, mockParams);
      return response;
    });

    expect(result).toEqual(mockResult);

    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(2);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams);
    expect(mockSapClient.call).toHaveBeenCalledWith(
      BAPI_TRANSACTION_COMMIT,
      {},
    );
  });

  it('throws an error when call rollback transaction', async () => {
    const errorSpy = jest.spyOn(Logger.prototype, 'error');

    jest
      .spyOn(mockSapClient, 'call')
      .mockRejectedValue(new Error('Rollback fails'));

    await expect(
      service.transaction(async (sapClient: SapClient) => {
        await sapClient.call(mockRFCName, mockParams);
      }),
    ).rejects.toThrow('Rollback fails');

    expect(mockSapPool.acquire).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledTimes(2);
    expect(mockSapClient.release).toHaveBeenCalledTimes(1);
    expect(mockSapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams);
    expect(mockSapClient.call).toHaveBeenCalledWith(
      BAPI_TRANSACTION_ROLLBACK,
      {},
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Failed to rollback transaction',
      Error('Rollback fails'),
    );
  });
});
