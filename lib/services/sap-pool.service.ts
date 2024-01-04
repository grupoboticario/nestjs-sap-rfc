import { Injectable, Logger } from '@nestjs/common';
import { RfcCallOptions, RfcObject } from 'node-rfc';
import {
  BAPI_TRANSACTION_COMMIT,
  BAPI_TRANSACTION_ROLLBACK,
} from '../constants';
import { InjectSapPool } from '../inject.decorator';
import { SapClient, SapPool } from '../types';
import { SapService } from './sap-service.interface';

@Injectable()
export class SapPoolService implements SapService {
  /**
   * Logger
   */
  private readonly logger = new Logger(SapPoolService.name);

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
   * @param options
   * @returns
   */
  public async execute<T extends RfcObject>(
    rfcName: string,
    rfcParams: RfcObject,
    options?: RfcCallOptions,
  ): Promise<T> {
    let sapClient: SapClient;
    try {
      sapClient = (await this.sapPool.acquire()) as SapClient;
      return (await sapClient.call(rfcName, rfcParams, options)) as T;
    } finally {
      if (sapClient) {
        await sapClient.release();
      }
    }
  }

  /**
   *
   * @param runInTransaction
   * @returns
   */
  public async transaction<T>(
    runInTransaction: (sapClient: SapClient) => Promise<T>,
  ): Promise<T> {
    let sapClient: SapClient;
    try {
      sapClient = (await this.sapPool.acquire()) as SapClient;
      const result = await runInTransaction(sapClient);
      await sapClient.call(BAPI_TRANSACTION_COMMIT, {});
      return result;
    } catch (err: any) {
      // we throw original error even if rollback thrown an error
      try {
        await sapClient.call(BAPI_TRANSACTION_ROLLBACK, {});
      } catch (rollbackError: any) {
        this.logger.error('Failed to rollback transaction', rollbackError);
      }

      throw err;
    } finally {
      if (sapClient) {
        await sapClient.release();
      }
    }
  }
}
