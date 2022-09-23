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

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sapClient).toBeDefined();
  });

  it('call RFC', async () => {
    jest.spyOn(sapClient, 'call').mockResolvedValue(mockResult);

    expect(await service.execute(mockRFCName, mockParams)).toEqual(mockResult);
    expect(sapClient.open).toHaveBeenCalledTimes(1);
    expect(sapClient.call).toHaveBeenCalledTimes(1);
  });
});
