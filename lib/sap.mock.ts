/* istanbul ignore file */

import { Injectable } from '@nestjs/common';
import { RfcObject } from 'node-rfc';
import {
  InjectSapClient,
  InjectSapPool,
  InjectSapService,
} from './inject.decorator';
import { SapService } from './services';
import { SapClient, SapPool } from './types';

export const mockSapClient = {
  open: jest.fn(),
  close: jest.fn(),
  call: jest.fn(),
  release: jest.fn(),
};

export const mockRFCName = 'MY_RFC';
export const mockParams = {
  userId: 1,
} as RfcObject;

export const mockResult = {
  name: 'my name',
} as RfcObject;

export const mockSapPool = {
  acquire: jest.fn().mockResolvedValue(mockSapClient),
};

export const mockSapService = {
  execute: jest.fn(),
};

@Injectable()
export class MyPoolService {
  sapPool: SapPool;
  constructor(
    @InjectSapPool()
    sapPool: SapPool,
  ) {
    this.sapPool = sapPool;
  }
}

@Injectable()
export class MyClientService {
  sapClient: SapClient;
  constructor(
    @InjectSapClient()
    sapClient: SapClient,
  ) {
    this.sapClient = sapClient;
  }
}

@Injectable()
export class MyService {
  sapService: SapService;
  constructor(
    @InjectSapService()
    sapService: SapService,
  ) {
    this.sapService = sapService;
  }
}
