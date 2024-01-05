import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BAPI_TRANSACTION_COMMIT,
  BAPI_TRANSACTION_ROLLBACK,
  SAP_CLIENT,
} from '../constants';
import {
  mockParams,
  mockRFCName,
  mockResult,
  mockSapClient,
} from '../sap.mock';
import { SapClient } from '../types';
import { SapClientService } from './sap-client.service';

describe('SapClientService', () => {
  let service: SapClientService;
  let sapClient: SapClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SapClientService,
        {
          provide: SAP_CLIENT,
          useValue: mockSapClient,
        },
      ],
    }).compile();

    service = module.get<SapClientService>(SapClientService);
    sapClient = module.get<SapClient>(SAP_CLIENT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sapClient).toBeDefined();
  });

  it('should be SAP_CLIENT initialized correctly', () => {
    expect(sapClient).toEqual(mockSapClient);
  });

  it('should be call RFC successfully', async () => {
    jest.spyOn(sapClient, 'call').mockResolvedValue(mockResult);

    expect(await service.execute(mockRFCName, mockParams)).toEqual(mockResult);
    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
  });

  it('should be call RFC with valid parameters', async () => {
    jest.spyOn(sapClient, 'call').mockResolvedValue(mockResult);

    const result = await service.execute(mockRFCName, mockParams, {
      timeout: 1000,
    });
    expect(result).toEqual(mockResult);
    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams, {
      timeout: 1000,
    });
  });

  it('throws an error when call RFC fails', async () => {
    jest.spyOn(sapClient, 'call').mockRejectedValue(new Error('Call failed'));

    await expect(service.execute(mockRFCName, mockParams)).rejects.toThrow(
      'Call failed',
    );

    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
  });

  it('should be call auto commit transaction successfully', async () => {
    jest.spyOn(sapClient, 'call').mockResolvedValue(mockResult);

    const result = await service.transaction(async (sapClient: SapClient) => {
      const response = await sapClient.call(mockRFCName, mockParams);
      return response;
    });

    expect(result).toEqual(mockResult);

    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(2);
    expect(sapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams);
    expect(sapClient.call).toHaveBeenCalledWith(BAPI_TRANSACTION_COMMIT, {});
  });

  it('should be call a rollback when a transaction fails', async () => {
    jest.spyOn(sapClient, 'call').mockImplementation((rfcName) => {
      if (rfcName === mockRFCName) {
        throw new Error('Rollback should be called');
      }

      return undefined;
    });

    await expect(
      service.transaction(async (sapClient: SapClient) => {
        await sapClient.call(mockRFCName, mockParams);
      }),
    ).rejects.toThrow('Rollback should be called');

    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(2);
    expect(sapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams);
    expect(sapClient.call).toHaveBeenCalledWith(BAPI_TRANSACTION_ROLLBACK, {});
  });

  it('throws an error when call rollback transaction', async () => {
    const errorSpy = jest.spyOn(Logger.prototype, 'error');

    jest
      .spyOn(sapClient, 'call')
      .mockRejectedValue(new Error('Rollback fails'));

    await expect(
      service.transaction(async (sapClient: SapClient) => {
        await sapClient.call(mockRFCName, mockParams);
      }),
    ).rejects.toThrow('Rollback fails');

    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(2);
    expect(sapClient.call).toHaveBeenCalledWith(mockRFCName, mockParams);
    expect(sapClient.call).toHaveBeenCalledWith(BAPI_TRANSACTION_ROLLBACK, {});
    expect(errorSpy).toHaveBeenCalledWith(
      'Failed to rollback transaction',
      Error('Rollback fails'),
    );
  });
});
