import { Injectable } from '@nestjs/common';
import { RfcObject } from 'node-rfc';
import { InjectSapPool } from '../inject.decorator';
import { SapClient, SapPool } from '../types';
import { SapService } from './sap-service.interface';

@Injectable()
export class SapPoolService implements SapService {
  /**
   *
   * @param sapPool
   */
  constructor(
    @InjectSapPool()
    private readonly sapPool: SapPool,
  ) {}

  /**
   *
   * @param rfcName
   * @param rfcParams
   */
  public async execute<T extends RfcObject>(
    rfcName: string,
    rfcParams: RfcObject,
  ): Promise<T> {
    const sapClient = (await this.sapPool.acquire()) as SapClient;
    try {
      return (await sapClient.call(rfcName, rfcParams)) as T;
    } finally {
      await sapClient.release();
    }
  }
}
