import { Test, TestingModule } from '@nestjs/testing';
import { SAP_CLIENT } from '../constants';
import {
  mockParams,
  mockResult,
  mockRFCName,
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

  it('SAP_CLIENT is initialized correctly', () => {
    expect(sapClient).toEqual(mockSapClient);
  });

  it('call RFC successfully', async () => {
    jest.spyOn(sapClient, 'call').mockResolvedValue(mockResult);

    expect(await service.execute(mockRFCName, mockParams)).toEqual(mockResult);
    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
  });

  it('call RFC with valid parameters', async () => {
    jest.spyOn(sapClient, 'call').mockResolvedValue(mockResult);

    const result = await service.execute(mockRFCName, mockParams);
    expect(result).toEqual(mockResult);
    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
  });

  it('throws an error when call RFC fails', async () => {
    jest.spyOn(sapClient, 'call').mockRejectedValue(new Error('Call failed'));

    await expect(service.execute(mockRFCName, mockParams)).rejects.toThrow(
      'Call failed',
    );

    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
  });
});
